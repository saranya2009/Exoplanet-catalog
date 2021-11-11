import * as React from 'react';
import { FlatList,View,Text,StyleSheet,SafeAreaView,Alert} from 'react-native';
import {Cards} from 'react-native-elements'

export default class Details extends React.Component{

constructor(props){
    super(props)
    this.state = {
        details : {},
        imagepath:'',
        url : `http://127.0.0.1:5000/planet?name=${this.props.navigation.getParam('planet_name')} `
    }
}

componentDidMount(){
    this.getDetails()
}

getDetails = ()=>{
    const {url} = this.state;
    axios.get(url).then(response=>{
        this.setDetails(response.data.data)
    })
    .catch(error=>{
        Alert.alert(error.message)
    })
}

setDetails = (planetdetails)=>{
    const planettype = planetdetails.planet_type;
    let imagepath = '';
    switch(planettype){
        case 'Gas Gaint':
            imagepath = require('../assets/gas_gaint.png');
        break;
        case 'Terrestrial':
            imagepath = require('../assets/terrestrial.png');
        break;
        case 'Super Earth':
            imagepath = require('../assets/super_earth.png');
        break;
        case 'Neptune Like':
            imagepath = require('../assets/neptune_like.png');
        break;
        default:
            imagepath = require('../assets/gas_gaint.png');
    }
    this.setState({
        details:planetdetails,
        imagepath:imagepath
    })
}

    render(){
        const {details,imagepath}=this.state
        if (details.specifications){
            return(
                <View style={styles.container}>
                    <Card title = {details.name} image={imagepath} imageProps = {{resizeMode:'contain',width:'100%'}}>
                        <View>
                            <Text style={styles.cardItem}>
                                {`distance from earth:${details.distance_from_earth}`}
                            </Text>
                            <Text style={styles.cardItem}>
                                {`distance from sun:${details.distance_from_the_sun}`}
                            </Text>
                            <Text style={styles.cardItem}>
                                {`gravity:${details.gravity}`}
                            </Text>
                            <Text style={styles.cardItem}>
                                {`orbital period:${details.orbital_period}`}
                            </Text>
                            <Text style={styles.cardItem}>
                                {`orbital speed:${details.orbital_speed}`}
                            </Text>
                            <Text style={styles.cardItem}>
                                {`planet mass:${details.planet_mass}`}
                            </Text>
                            <Text style={styles.cardItem}>
                                {`planet radius:${details.planet_radius}`}
                            </Text>
                            <Text style={styles.cardItem}>
                                {`planet type:${details.planet_type}`}
                            </Text>
                        </View>
                        <View style={[styles.cardItem,{flexDirection:'column'}]}>
                            <Text>
                                {details.specifications?`Specifications:`:''}
                            </Text>
                            {details.specifications.map((item,index)=>(
                                <Text key = {index.toString()}
                                style={{marginleft:50}}>
                                    {item}
                                </Text>
                            ))}
                        </View>
                    </Card>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1 },
    cardItem: { 
        marginBottom: 10 
    } 
});