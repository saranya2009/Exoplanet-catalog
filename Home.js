import * as React from 'react';
import { FlatList,View,Text,StyleSheet,SafeAreaView,Alert, SegmentedControlIOSComponent} from 'react-native';
import {ListItems} from 'react-native-elements';
import axios from 'axios';


export default class HomeScreen extends React.Component{

constructor(props){
    super(props);
    this.state = {
        listdata:[],
        url:'http://127.0.0.1:5000/'
    }
}

componentDidMount(){
    this.getplanets()
}

getplanets = ()=>{
    const {url} = this.state;
    axios.get(url).then(response=>{
        return this.setState({
            listdata:response.data.data
        })
    })
    .catch(error=>{
        Alert.alert(error.message)
    })
}
renderItem = ({item,index})=>(
    <ListItems 
    key={index}
    title={`Planet:${item.name}`}
    subtitle = {`DistancefromEarth:#{item.distance_from_earth}`}
    titleStyle = {styles.title}
    containerStyle = {styles.listcontainer}
    bottomDivider 
    chevron
    onPress = {()=>this.props.navigation.navigate('Details',{planet_name:item.name})}
    />
)

keyExtracter = (item,index)=>index.toString()
    render(){
        const {listdata} = this.state
        if(listdata.length===0){
            return(
                <View style={styles.emptycontainer}>
                    <Text>
                     Loading    
                    </Text> 
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <SafeAreaView/>
                <View style={styles.uppercontainer}>
                    <Text style={styles.headertext}>
                        planets world
                    </Text>
                </View>
                <View style={styles.lowercontainer}>
                    <FlatList
                    keyExtractor={this.keyExtracter}
                    data = {this.state.listdata}
                    renderItem = {
                        this.renderItem
                    }
                    />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor: "#edc988" 
    }, 
    uppercontainer: { 
        flex: 0.1, 
        justifyContent: "center", 
        alignItems: "center" 
    }, 
    headertext: { 
        fontSize: 30, 
        fontWeight: "bold", 
        color: "#132743"
     }, 
     lowercontainer: { 
         flex: 0.9 
        }, 
    emptycontainer: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center" 
    }, 
    emptycontainertext: { 
        fontSize: 20 
    }, 
    title: { 
        fontSize: 18, 
        fontWeight: "bold", 
        color: "#d7385e" 
    }, 
    listcontainer: { 
        backgroundColor: "#eeecda" 
    } 
})