from tensorflow.keras.applications.inception_v3 import InceptionV3
from tensorflow.keras.applications.inception_v3 import preprocess_input
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing.image import img_to_array
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from tqdm import tqdm

import pandas as pd
import numpy as np
import os
import shutil
import pyrebase
import shutil


class Model:
    config = {
        "apiKey": "AIzaSyCF8Nx6KkB0svOLuHoMyZtQTKoHdfULQwY",
        "authDomain": "pocketcloset-345616.firebaseapp.com",
        "databaseURL": "https://pocketcloset-345616-default-rtdb.firebaseio.com",
        "projectId": "pocketcloset-345616",
        "storageBucket": "pocketcloset-345616.appspot.com",
        "serviceAccount": "./key.json",
    }

    firebase_storage = pyrebase.initialize_app(config)
    storage = firebase_storage.storage()

    def find_repeated_clothes(self, type, uid):
        all_files = self.storage.child().list_files()
        result = []
        file_to_compare = ""
        exists = os.path.isdir(f"tmp/{uid}")
        if exists:
            shutil.rmtree(f"tmp/{uid}", ignore_errors=True)
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

        files = [
            os.path.join(dp, f)
            for dp, dn, fn in os.walk(os.path.expanduser(f"tmp/{uid}"))
            for f in fn
        ]
        img_features, img_name = self.image_feature(files)
        sil = []
        kl = []
        kmax = 10
        for k in range(2, kmax + 1):
            kmeans2 = KMeans(n_clusters=k).fit(img_features)
            labels = kmeans2.labels_
            sil.append(silhouette_score(img_features, labels, metric="euclidean"))
            kl.append(k)
        res = dict(zip(sil, kl))
        k_value = res[max(sil)]
        clusters = KMeans(k_value, random_state=40)
        clusters.fit(img_features)
        image_cluster = pd.DataFrame(img_name, columns=["image"])
        image_cluster["clusterid"] = clusters.labels_
        found_cluster = image_cluster[
            image_cluster["image"].str.contains(file_to_compare)
        ].iloc[0]["clusterid"]
        filtered_cluster = image_cluster.loc[
            image_cluster["clusterid"] == found_cluster
        ]
        image_list = list(filtered_cluster["image"])
        filename_list = []
        for i in image_list:
            filepaths = i.split("/")
            filename_list.append(filepaths[-1])

        return {
            "k_value": k_value,
            "target_cluster": str(found_cluster),
            "image_cluster": image_cluster.to_json(orient="records"),
            "filename_list": filename_list,
        }

    # Function to Extract features from the images
    def image_feature(self,direc):
        model = InceptionV3(
            include_top=True,
            weights="imagenet",
            input_tensor=None,
            input_shape=None,
            pooling=None,
            classes=1000,
        )
        features = []
        img_name = []

        for i in tqdm(direc):
            if ".DS_Store" in i:
                continue
            print(i)
            img = image.load_img(i, target_size=(299, 299))
            x = img_to_array(img)
            x = np.expand_dims(x, axis=0)
            x = preprocess_input(x)
            feat = model.predict(x)
            feat = feat.flatten()
            features.append(feat)
            img_name.append(i)
        return features, img_name
