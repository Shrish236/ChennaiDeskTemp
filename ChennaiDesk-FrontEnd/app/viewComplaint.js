import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { View, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, Text } from 'react-native';
import Icon from '@mdi/react';
import { mdiCardText } from '@mdi/js';
const LeftContent = props => <Avatar.Icon {...props} icon="text" />

const MyComponent = () => {
    const params = useLocalSearchParams();
    const complaint = params;
    const [complaintDetails, setComplaintDetails] = useState([]);
    useEffect(() => {
        Retrieval();
    }, [])
    const Retrieval = async() =>{
        axios.post('http://192.168.187.114:80/viewComplaint',{
            id: complaint.x
          })
          .catch((error) => {
            console.log("jgjhgjh")
            console.log(error)
          })
          .then(function(response){
          console.log("Complaint")
          if(response.data === null){
            console.log("sddssd")
            alert("Enter correct details and try again")
          }
          else{
            //console.log(response.data)
            // router.push({
            //   pathname: "userDashboard",
            // });
            setComplaintDetails(response.data)
            // setLoading2(false);
          }
        })
      }
    if(complaintDetails.complaint_address == undefined){
        return (
            <SafeAreaView>
            <View style={{marginTop:10, justifyContent:"center", alignItems:"center"}}>
                <ActivityIndicator size="large">{}</ActivityIndicator>
            </View>
            </SafeAreaView>
        );
    }
    //   console.log(complaintDetails.complaint_address)
    return(
        <SafeAreaView>
            <ScrollView>
            <View style={{justifyContent:"center", marginLeft:10, marginTop:20, marginRight:10, marginBottom:20}}>
            <Card
            mode="contained"
            style={{backgroundColor: complaintDetails.status == "open"? "#c0f5ab": "#f5bace"}}
            >
                <Card.Title title={complaintDetails.complaint_title} subtitle={complaintDetails.complaint_type} left={LeftContent} 
                titleStyle={{fontWeight:"900", fontSize:24}}
                style={{marginTop:10, paddingRight:5, marginBottom:10}}
                titleNumberOfLines={3}
                subtitleStyle={{fontSize:16, fontFamily:"arial", fontStyle:"italic"}}
                subtitleNumberOfLines={3}/>
                <Card.Content
                titleStyle={{fontSize:12, fontFamily:"arial"}}>
                {}
                {/* <Title>{complaintDetails.anonymous == 1? "Anonymous": complaintDetails.name}</Title> */}
                <Title><Text style={{fontWeight:"bold"}}>Location:</Text><Title style={{fontStyle:"italic", fontSize:17}}> {complaintDetails.complaint_address.complaint_street},  {complaintDetails.complaint_address.complaint_area}, {complaintDetails.complaint_address.complaint_locality}</Title></Title>
                <Title><Text style={{fontWeight:"bold"}}>Posted by:</Text><Title style={{fontStyle:"italic", fontSize:17}}> {complaintDetails.anonymous == 1? "Anonymous": complaintDetails.name}</Title></Title>
                <Title><Text style={{fontWeight:"bold"}}>Description:</Text></Title>
                <Paragraph style={{marginTop:10,marginBottom:15, fontStyle:"italic", fontSize:17}}>{complaintDetails.complaint_description}</Paragraph>
                <Title style={{ marginBottom:15}}><Text style={{fontWeight:"bold"}}>Status:</Text><Title style={{fontStyle:"italic", fontSize:17}}> {complaintDetails.status}</Title></Title>
                </Card.Content>
                <Card.Cover style={{marginLeft:6, marginRight:6,}} source={{ uri: "data:"+complaintDetails.complaint_proof.imageType+";base64,"+complaintDetails.complaint_proof.complaintImageBinary }} />
                {/* <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
                </Card.Actions> */}
                <Card.Actions>

                </Card.Actions>
            </Card>
            </View>
            </ScrollView>
        </SafeAreaView>
);
}

export default MyComponent;