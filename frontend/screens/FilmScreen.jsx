import { Button, StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, Modal, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import LikeIcon from 'react-native-vector-icons/AntDesign';
import InfoIcon from 'react-native-vector-icons/Entypo';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import  Events from '../components/filmScreen/Events';
import  Comments from '../components/filmScreen/Comments';

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_IP_ADDRESS;

export default function FilmScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('events');
  const [refreshData, setRefreshData] = useState(false);
  const [refreshEvents, setRefreshEvents] = useState(false);
  const [refreshComments, setRefreshComments] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [likes, setLikes] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [visible, setVisible] = useState(false);

  const user = useSelector((state) => state.user.value);
  const filmId = route.params.id;
  
  //Récupérer tout les commentaires déja éxistants ansi que les likes depuis la BDD sur un film en utilisant son ID
  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/films/${filmId}/${user.token}/film`)
    .then(response => response.json())
    .then(filmData => {
      setLikes(filmData.likes);
      setIsLike(filmData.isLiked);
    });
    setRefreshData(false);
  } ,[refreshData]);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/films/${filmId}/comments`)
    .then(response => response.json())
    .then(filmData => {
      setAllComments(filmData.comments);
    });
    setRefreshComments(false);
  } ,[refreshComments]);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/events/${filmId}/${user.token}/events`)
    .then(response => response.json())
    .then(eventsData => {
      setAllEvents(eventsData.events)
    })
    setRefreshEvents(false);
  } ,[refreshEvents]);

  //requete post like
  const toggleLike = () => {
    fetch(`${BACKEND_ADDRESS}/films/${filmId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({user : user.token})
    })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        setRefreshData(true);
      }
    });
  }

  
  const redirectedToEvents = () => {
    setActiveTab('events');
  }
  const redirectedToComments = () => {
    setActiveTab('comments');
  }

  return (
    <SafeAreaView style={{backgroundColor: '#1E1C1A', flex:1}}>
      <View style={[styles.containerFilm, Platform.OS !== 'ios' && { marginTop: 30 } ]}>
        <Text style={styles.titleFilm}>{route.params.title}</Text>
        <Image
  source={
    route.params.backdrop_path
      ? { uri: `https://image.tmdb.org/t/p/w500/${route.params.backdrop_path}` }
      : require("../assets/logo/placeholder/backdrop.png")
  }
  style={styles.imageFilm}
/>
        
        <View style={styles.containerIconsFilm}>
          <View style={styles.likeContainer}>
            <LikeIcon 
              name={isLike ? 'heart' : 'hearto'} 
              size={20} 
              color={isLike ? 'red' : 'white'} 
              onPress={() => toggleLike()}
            />
            <Text style={styles.likeCount} onPress={() => toggleLike()}>
              {likes === 1 ? `${likes} like` : (likes === undefined || likes === 0 )? "0 like" : `${likes} likes`}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.infoIcon}>
            <InfoIcon name='info' size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)} // Permet de fermer avec le bouton retour
      >
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.title}>{route.params.title}</Text>
            <Text style={styles.description}>{route.params.overview}</Text>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => redirectedToEvents()} style={styles.buttonRedirectEvents} activeOpacity={0.8}>
          <Text style={activeTab === 'events' ? styles.buttonOn : styles.buttonOff}>Evénements</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => redirectedToComments()} style={styles.buttonRedirectComments} activeOpacity={0.8}>
          <Text style={activeTab === 'comments'? styles.buttonOn : styles.buttonOff}>Commentaires</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex :1}}>
          {activeTab === "events" ? (
            <Events 
            filmId={filmId}
            allEvents={allEvents}
            refresh={() => setRefreshEvents(true)}
            />
          ) : (
            <Comments 
              filmId={filmId}
              allComments={allComments}
              refresh={() => setRefreshComments(true)}
            />
          )}
      </View>
      <StatusBar style='light'/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerFilm: {
    width: '100%',
    height: '33%',
    marginBottom: 5,
  },
  titleFilm: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 500,
    marginBottom: 3,
  },
  imageFilm: {
    height: 180,
    resizeMode: "cover",
    borderRadiustop: 10,
    width: '100%',
  }, 
  containerIconsFilm: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
  },
  likeContainer: {
    flexDirection: 'row',
  },
  likeCount: {
    color: 'white',
    fontSize: 17,
    marginLeft: 5,
    marginTop: 3
  },
  infoIcon: {
    marginLeft: 10
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }, 
  buttonOn: {
    borderWidth: 2, 
    borderColor: "#C94106", 
    color: "#C94106", 
    backgroundColor: "rgba(201, 65, 6, 0.1)", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, 
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    backdropFilter: "blur(10px)",
    width: 160,
  },
  buttonOff: {
    borderWidth: 2, 
    borderColor: "#969696", 
    color: "#969696", 
    backgroundColor: "rgba( 150, 150, 150, 0.1)", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, 
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    backdropFilter: "blur(10px)",
    width: 160,
  },
  buttonRedirectEvents: {
    justifyContent: 'center',
    alignItems: "center",
  },
  buttonRedirectComments: {
    justifyContent: 'center',
    alignItems: "center",
  },
  overlay: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "rgba(0,0,0,0.5)" 
  },
  popup: { 
    backgroundColor: "#fff", 
    padding: 20, borderRadius: 10, 
    width: '77%' 
  },
  title: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  description: { 
    fontSize: 16, 
    marginBottom: 20 
  },
  closeButton: { 
    backgroundColor: "#FF5733", 
    padding: 10, 
    borderRadius: 5, 
    alignItems: "center" 
  },
  closeText: { 
    color: "#fff", 
    fontWeight: "bold" 
  }
});