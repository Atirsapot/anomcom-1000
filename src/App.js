import React, { useRef, useState } from 'react';
import './App.css';


// importataan tarvittavat firebasen ominaisuudet
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


//importataan työkalut kirjautumistietoihin authilla,
//ja viestien tallentamiseen firestorella
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'


//firebasen web app tunnarit
firebase.initializeApp({
  apiKey: "AIzaSyA-9z_jVEZvjE8Y9n5aunKZqBDzDSPZv1w",
  authDomain: "chat-3b8fe.firebaseapp.com",
  databaseURL: "https://chat-3b8fe.firebaseio.com",
  projectId: "chat-3b8fe",
  storageBucket: "chat-3b8fe.appspot.com",
  messagingSenderId: "810954965230",
  appId: "1:810954965230:web:722e25b1e78e3202f4f3ff"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

//Sovelluksen alotussivu. 
//Näytetään ensin kirjaudu sisään-nappi, 
//jonka jälkeen aukeaa itse chatti eli ChatRoom
function App() {
 
  // määrittää "userin" firebasen auth statella 
  const [user] = useAuthState(auth);

  return (

    // user user ? <ChatRoom /> : <SignIn/> tarkastaa onko "user" määritetty.
    // Mikäli on, näytetään ChatRoom, 
    // mikäli ei, näytetään kirjautumisnappula.
    <div className="App">
      <header>
        <h1>ANOMCOM-1000</h1>
        <SignOut/> 
      </header>

      <section >

        {user ? <ChatRoom /> : <SignIn/>}
      </section>

    </div>
  );
}


// Sisäänkirjautuminen. 
// Firebasen sisäänrakennettu kirjautumistyökalu. 
// Jos käyttäjää ei ole määritetty, näyttää kirjautumisnappulan.
// Kirjautumisnappula avaa popupkirjautumisikkunan.
function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>

      <button className="sign-in" onClick={signInWithGoogle}>CONNECT</button>
      <center>
      <p>WELCOME TO ANOMCOM-1000. </p>
      <p>ANOMCOM STANDS FOR ANONYMOYS NETWORKING OVER MINIMAL COMMS ON MOBILE </p>
    </center>
    </>
  )

}


// Uloskirjautuminen chatistä. 
// Kirjaa käyttäjän ulos chatistä.
// TODO: Lisää lähetettyjen viestien tyhjentäminen
function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>DISCONNECT</button>
  )
}


// Varsinainen Chatikkuna.

// 

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  
  // Hakee Firebasesta taulukkoon [messages] 25 viimeisintä viestiä. 
  // Jokaisella viestillä on myös lähettäjä ID
  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  // Viestin tallentaminen
  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid } = auth.currentUser;

    // lisää kirjoitetun viestin sisällön, ajan,
    // sekä käyttäjäIDn firebaseen uutena datana
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      
    })

    // Chat näyttää automaattisesti tuoreimman viestin.
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="..." />

      <button type="submit" disabled={!formValue}>UPLOAD MESSAGE</button>

    </form>
  </>)
}

function ChatMessage(props) {
  const { text, uid} = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
     
      <p>{text}</p>
    </div>
  </>)
}

export default App;
