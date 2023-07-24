from flask import Flask, jsonify, render_template, request, jsonify, Response
from pymongo import MongoClient
import json
from json import JSONEncoder
import bson.json_util as json_util
from bson.objectid import ObjectId
from geopy.geocoders import Nominatim
import certifi
import ssl
import geopy 
import pandas as pd
import numpy as np
import sklearn.metrics as sks
from pandas import json_normalize
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
geopy.geocoders.options.default_ssl_context = ctx


app = Flask (__name__)
client = MongoClient('localhost', 27017)

db = client.ChennaiDesk
userCollection = db.UserDetails
adminCollection = db.AdminDetails
authorityCollection = db.AuthorityDetails
complaintCollection = db.ComplaintDetails
profilePicCollection = db.profilePIcs
geolocator = Nominatim(scheme='http', user_agent="ChennaiDesk", timeout=10)


# complaint_data = pd.DataFrame(complaints)
# user_data = pd.DataFrame(user)
# temp=complaint_data['complaint_address']
# print(temp['latitude'])
@app.route('/justarandomname', methods = ['GET', 'POST'])
def get_articles():
    if request.method == 'POST':
        # data = request.form
        # print(data)
        # user = userCollection.find_one({ "email": data['email'], "password": data['password']})
        # # temp1=json_util.dumps(user)
        # # temp = json.loads(temp1)
        # # x=json.dumps(temp1)
        # # y=jsonify(temp1)
        # # print(type(user),type(temp),type(temp1), type(x), type(y), user['email'])
        # for key in user:
        #     if key == 'address' or key == '_id':
        #         user[key] = ""
        # temp1 = json_util.dumps(user)
        # return json.dumps(temp1)
        data = request.get_json()
        user = userCollection.find_one({ "email": data['email'], "password": data['password']})
        temp1=json_util.dumps(user)
        
        #print(s+"}")
        return temp1
    return json_util.dumps(None)

@app.route('/complaintsByDistance', methods = ['GET', 'POST'])
def get_complaints_distance_based():
    if request.method == 'POST':
        data = request.get_json()
        #print(data)
        #complaints = list(complaintCollection.find({ "email": data['email'], "name": data['name']}).sort("likes",-1))
        user = userCollection.find({ "email": data['email']})
        #print(complaints)
        complaints = list(complaintCollection.find({}))
        #user = list(userCollection.find({ "email": "ram123@gmail.com"}))
        sanitized1 = json.loads(json_util.dumps(complaints))
        normalized1 = json_normalize(sanitized1)
        df1 = pd.DataFrame(normalized1)
        #print(df1)
        sanitized2 = json.loads(json_util.dumps(user))
        normalized2 = json_normalize(sanitized2)
        df2 = pd.DataFrame(normalized2)
        #print(df2)
        df3=pd.DataFrame({"complaint_address.latitude":df2['lat'], "complaint_address.longitude":df2['long']})
        df_temp = pd.concat([df1,df3], ignore_index=True)
        #print(df_temp['complaint_address.latitude'])
        df_temp[['lat_radians','long_radians']] = (np.radians(df_temp.loc[:,['complaint_address.latitude','complaint_address.longitude']]))
        dist = sks.DistanceMetric.get_metric('haversine')
        dist_matrix = (dist.pairwise(df_temp[['lat_radians','long_radians']])*3959)
        df_temp['Distance'] = dist_matrix[-1]
        df_temp=df_temp.sort_values("Distance")
        df_temp.drop(len(df1), axis=0, inplace=True)
        df_temp.rename(columns={"_id.$oid": "$oid"}, inplace=True)
        df_temp.rename(columns={"complaint_address.complaint_specific_location":"specificLocation"}, inplace=True)
        df_temp.rename(columns={"complaint_address.complaint_street":"complaint_street"}, inplace=True)  
        df_temp.rename(columns={"complaint_address.complaint_area":"complaint_area"}, inplace=True)                         
        df_temp.rename(columns={"complaint_address.complaint_locality":"complaint_locality"}, inplace=True)
        df_temp.rename(columns={"complaint_address.complaint_pincode":"complaint_pincode"}, inplace=True)                            
        df_temp.rename(columns={"complaint_proof.complaintImageBinary":"complaintImageBinary"}, inplace=True) 
        df_temp.rename(columns={"complaint_address.imageType":"imageType"}, inplace=True)                          
                                 
        df_temp2=df_temp.to_json(orient="records")
        #print(df_temp2)
        return json_util.dumps(json.loads(df_temp2))
    return json_util.dumps(None)

@app.route('/complaints', methods = ['GET', 'POST'])
def get_complaint_details():
    if request.method == 'POST':
        data = request.get_json()
        #print(data)
        complaints = list(complaintCollection.find().sort("likes",-1))
        #print(complaints)
        return json_util.dumps(complaints)
    return json_util.dumps(None)

@app.route('/editProfile', methods = ['GET', 'POST'])
def update_user_profile():
    if request.method == 'POST':
        temp = request.form
        #print(temp)
        
        userCollection.update_one({"email": temp['email']}, {"$set" : {"name": temp['name'], "age": temp['age'], "gender": temp['gender'],
                                                               "address.street": temp['street'], "address.locality": temp['locality'], "address.area": temp['area'], "address.pincode": temp['pincode'], "mobile": temp['mobile'],
                                                               "profilePicSrc":temp['imageSrc'], "profilePicType": temp['imageType'], "profilePicFileName": temp['imageFileName'],
                                                               "profilePic":temp['imageBinary']}})
        user = userCollection.find_one({ "email": temp['email']})
        return json_util.dumps(user)
    return json_util.dumps(None)

@app.route('/viewComplaint', methods = ['GET', 'POST'])
def viewComplaint():
    if request.method == 'POST':
        data = request.get_json()
        temp = data['id']
        id = ObjectId(temp)
        complaint = complaintCollection.find_one({ "_id": id})
        return json_util.dumps(complaint)
    return json_util.dumps(None)

@app.route('/registerComplaint', methods = ['GET', 'POST'])
def register_complaint():
    if request.method == 'POST':
        temp = request.get_json()
        #print(temp)
        print(temp['area'] + ", "+"Chennai, "+temp['pincode'])
        location = geolocator.geocode(temp['area'] + ", "+"Chennai, "+temp['pincode'])
        print(location)
        print(location.raw)
        print(location.latitude, end=" ")
        print(location.longitude)
        lat = location.latitude
        long = location.longitude
        x = complaintCollection.insert_one({"email": temp['email'], "name": temp['name'], "complaint_address" : {"complaint_specific_location":temp['spLocation'],
                                        "complaint_street":temp['street'],"complaint_area":temp['area'],"complaint_locality":temp['locality'],
                                        "complaint_pincode":temp['pincode'], "latitude": lat, "longitude": long}, "complaint_type":temp['type'], "complaint_description": temp['description'], "complaint_title": temp['title'],
                                        "complaint_proof":{"complaintImageBinary": temp['imageBinary'], "imageType": temp['image_Type']},
                                        "anonymous": temp['anon'], "likes": 0, "isLiked": False, "status": "open"})
        #print(x)
        
        if(x.inserted_id):
            return "True"
        
        return json_util.dumps(None)
    return json_util.dumps(None)

@app.route('/userRegisteredComplaints', methods = ['GET', 'POST'])
def get_user_complaints():
    if request.method == 'POST':
        data = request.get_json()
        #print(data)
        complaints = list(complaintCollection.find({ "email": data['email'], "name": data['name']}))
        #print(complaints)
        return json_util.dumps(complaints)
    return json_util.dumps(None)

@app.route('/registerUser', methods = ['GET', 'POST'])
def register_user():
    if request.method == 'POST':
        temp = request.get_json()
        #print(temp)
        print(temp['area'] + ", "+"Chennai, "+temp['pincode'])
        location = geolocator.geocode(temp['area'] + ", "+"Chennai, "+temp['pincode'])
        print(location)
        print(location.raw)
        print(location.latitude, end=" ")
        print(location.longitude)
        lat = location.latitude
        long = location.longitude
        x = complaintCollection.insert_one({"email": temp['email'], "name": temp['name'], "password": temp['pass'], "address" : {"specific_location":temp['spLocation'],
                                        "street":temp['street'],"area":temp['area'],"locality":temp['locality'],
                                        "pincode":temp['pincode']}, "lat": lat, "long": long, "pincode":temp['pincode'], "gender":temp['gender'], "age": temp['age'], "mobile": temp['mobile'],
                                        "profilePic": temp['imageBinary'], "profilePicType": temp['image_Type']})
        
        #print(x)
        y = profilePicCollection.insert_one({"email":temp['email'], "profilePic": temp['imageBinary'], "profilePicType": temp['image_Type']})
        if(x.inserted_id and y.inserted_id):
            return "True"
        
        return json_util.dumps(None)
    return json_util.dumps(None)

@app.route('/changeStatus', methods = ['GET', 'POST'])
def change_complaint_status():
    id="6433ccd5fafa1c351e51bf83"
    id1=ObjectId(id)
    x=complaintCollection.update_one({"_id": id1}, {"$set" : {"status":"closed"}})
    return "True"
if __name__ == "__main__":
    app.run(host='192.168.0.177', port=80, debug=True)