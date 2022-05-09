from PIL import Image
from Models.imageFeatures import ImageFeatures
from Models.cluster import Cluster
from math import sqrt

import pandas as pd
import numpy as np
import os
import random
import shutil
import pyrebase
import shutil


class Model:
    config = {
        "apiKey": "",
        "authDomain": "pocketcloset-345616.firebaseapp.com",
        "databaseURL": "https://pocketcloset-345616-default-rtdb.firebaseio.com",
        "projectId": "pocketcloset-345616",
        "storageBucket": "pocketcloset-345616.appspot.com",
        "serviceAccount": "./key.json",
    }
    SEED = 123456789
    K = 5
    NUMBER_OF_ITERATIONS = 5
    FOLDERNAME = ""
    firebase_storage = pyrebase.initialize_app(config)
    storage = firebase_storage.storage()

    def find_repeated_clothes(self, type, uid):
        all_files = self.storage.child().list_files()
        result = []
        file_to_compare = ""
        exists = os.path.isdir(f"tmp/{uid}")
        self.FOLDERNAME = f"tmp/{uid}"
        if exists:
            shutil.rmtree(f"tmp/{uid}", ignore_errors=True)
            shutil.rmtree(f"tmp/{uid}/", ignore_errors=True)
        os.makedirs(f"tmp/{uid}")
        for file in all_files:
            fname = file.name
            filepaths = fname.split("/")
            if type in filepaths and uid in filepaths:
                result.append(filepaths[-1])
                file.download_to_filename(f"tmp/{uid}/{filepaths[-1]}")

            if "compare" in filepaths and uid in filepaths:
                result.append(filepaths[-1])
                file_to_compare = filepaths[-1]
                file.download_to_filename(f"tmp/{uid}/{filepaths[-1]}")

        print(file_to_compare, "file to compare")
        files = [
            os.path.join(dp, f)
            for dp, dn, fn in os.walk(os.path.expanduser(f"tmp/{uid}"))
            for f in fn
        ]
        list_filenames = []
        for file in files:
            filepaths = file.split("/")
            fname = filepaths[-1]
            list_filenames.append(fname)

        # get features of each image
        images = {}
        for file in files:
            filepaths = file.split("/")
            fname = filepaths[-1]
            data = self.load_image(file)
            features = self.find_features(np.ndarray.tolist(data))
            images.update({fname: features})

        # create initial clusters
        clusters = []
        random.seed(self.SEED)
        for i in range(self.K):
            index = random.randint(0, len(list_filenames) - 1)
            initial_mean = images[list_filenames[index]]
            # create location for cluster photos
            path = self.FOLDERNAME + "/" + str(i)
            if not os.path.exists(path):
                os.mkdir(path)
            clusters.append(Cluster(i, initial_mean, path))
            list_filenames.remove(list_filenames[index])

        # perform several iterations of clasification until convergence
        classifications = {}
        for i in range(self.NUMBER_OF_ITERATIONS):
            print("iteration", (i + 1), "of", self.NUMBER_OF_ITERATIONS)
            # reset members on each iteration
            for cluster in clusters:
                cluster.members = []
            # classify each photo
            for file in files:
                filepaths = file.split("/")
                fname = filepaths[-1]
                image_features = images[fname]
                classification = self.classify_image(image_features, clusters)
                classifications.update({fname: classification})
            # update the means for classifications after each iteration
            clusters = self.update_classifiers(clusters)
            for cluster in clusters:
                print(
                    cluster.mean.brightness,
                    cluster.mean.majorityRed,
                    cluster.mean.majorityGreen,
                    cluster.mean.majorityBlue,
                )

        target_classification = ""
        image_list_result = []
        # move photos to appropriate cluster
        for file in files:
            filepaths = file.split("/")
            fname = filepaths[-1]
            image_data = self.load_image(file)
            classification = classifications[fname]
            if file_to_compare == fname:
                target_classification = classification
            self.save_image(image_data, clusters[classification].path + "/" + fname)

        for file in files:
            filepaths = file.split("/")
            fname = filepaths[-1]
            classification = classifications[fname]
            if classification == target_classification:
                image_list_result.append(fname)

        return {"filename_list": image_list_result, "cluster": target_classification}

    def load_image(self, filename):
        image = Image.open(filename, "r")
        image.load()
        data = np.asarray(image, dtype="uint8")
        return data

    def find_features(self, image_data):
        brightness = 0
        redMajority = 0
        greenMajority = 0
        blueMajority = 0
        numberPixels = len(image_data) * len(image_data[0])
        for row in image_data:
            for pixel in row:
                brightness += (pixel[0] + pixel[1] + pixel[2]) / 3
                if pixel[0] > pixel[1] and pixel[0] > pixel[2]:
                    redMajority += 1
                elif pixel[1] > pixel[0] and pixel[1] > pixel[2]:
                    greenMajority += 1
                elif pixel[2] > pixel[0] and pixel[2] > pixel[1]:
                    blueMajority += 1
                elif pixel[0] == pixel[1]:
                    redMajority += 1
                    greenMajority += 1
                elif pixel[1] == pixel[2]:
                    blueMajority += 1
                    greenMajority += 1
                elif pixel[0] == pixel[2]:
                    redMajority += 1
                    blueMajority += 1
                else:
                    redMajority += 1
                    greenMajority += 1
                    blueMajority += 1
        brightness /= numberPixels
        redMajority /= numberPixels
        greenMajority /= numberPixels
        blueMajority /= numberPixels
        return ImageFeatures(brightness, redMajority, greenMajority, blueMajority)

    def classify_image(self, features, clusters):
        # calculate distance from each mean
        distances = {}
        for cluster in clusters:
            distance = self.calc_distance(features, cluster.mean)
            distances.update({cluster: distance})
        # pick smallest distance and add photo
        closest_cluster = list(distances.keys())[0]
        for key in distances:
            if distances[key] < distances[closest_cluster]:
                closest_cluster = key

        closest_cluster.members.append(features)
        return closest_cluster.title

    def calc_distance(self, features1, features2):
        red_difference = features1.majorityRed - features2.majorityRed
        blue_difference = features1.majorityBlue - features2.majorityBlue
        green_difference = features1.majorityGreen - features2.majorityGreen
        brightness_difference = features1.brightness - features2.brightness

        distance = sqrt(
            pow(red_difference, 2)
            + pow(green_difference, 2)
            + pow(blue_difference, 2)
            + pow(brightness_difference, 2)
        )
        return distance

    def update_classifiers(self, clusters):
        """updates the mean of each Cluster in the passed list to match its members

        Args:
            clusters (list of Clusters): the different clusters the color can be assigned to

        Returns:
        the updated list of clusters
        """
        for cluster in clusters:
            brightness = 0
            majorityRed = 0
            majorityGreen = 0
            majorityBlue = 0
            numberOfMembers = len(cluster.members)
            for image in cluster.members:
                brightness += image.brightness
                majorityRed += image.majorityRed
                majorityGreen += image.majorityGreen
                majorityBlue += image.majorityBlue
            brightness /= numberOfMembers
            majorityRed /= numberOfMembers
            majorityGreen /= numberOfMembers
            majorityBlue /= numberOfMembers
            cluster.mean = ImageFeatures(
                brightness, majorityRed, majorityBlue, majorityGreen
            )
        return clusters

    def save_image(self, image_data, path):
        image = Image.fromarray(image_data)
        image.save(path, mode="RGB")
