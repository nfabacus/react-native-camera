import React, { Component } from 'react'
import { StyleSheet, Text, Image, ScrollView, View, Vibration } from 'react-native'
import { Permissions, Constants, Camera, FileSystem } from 'expo'
import { Button, Icon } from 'react-native-elements'

const pictureSize = 170;

export default class ImageAlbum extends Component {
  state={
    photos:[]
  }

  componentDidMount() {
    console.log("ImageAlbum::componentDidMount::FileSystem.documentDirectory>>", FileSystem.documentDirectory)
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos').then(photos => {
      console.log("photos from fileSystem>>", photos)
      this.setState({
        photos
      })
    })
  }

  render(){
    console.log("photos>>>", this.state.photos)
    return (
      <View
        style={styles.container}
      >
        <Icon
          raised
          size={20}
          underlayColor="#c9c9c9"
          name="camera"
          type="font-awesome"
          color="black"
          onPress={this.props.toggleView}
        />
        <ScrollView contentComponentStyle={{ flex: 1 }}>
          <Text>Image Album</Text>
          <View style={styles.pictures}>
            {
              this.state.photos.map(photoUri=>(
                <View style={styles.pictureWrapper} key={photoUri}>
                  <Image
                    key={photoUri}
                    style={styles.picture}
                    source={{
                      uri: `${FileSystem.documentDirectory}photos/${photoUri}`,
                    }}
                  />
                </View>
              ))
            }
          </View>
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  picture: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    resizeMode: 'contain',
  },
  pictureWrapper: {
    width: pictureSize,
    height: pictureSize,
    margin: 5,
  },
})


