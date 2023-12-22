import NewFeed from "@/components/home/NewFeed";
import ProfileInfo from "@/components/home/ProfileInfo";
import { MainLayout } from "@/layouts";
import firebase_app from "../firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import LandingPage from "@/components/landing";

const auth = getAuth(firebase_app);

const HomePage = () => {
  // const email = "159iker@gmail.com";
  // const password = "123456";
  // const { data } = useSession();
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState<any>([]);

  // useEffect(() => {
  //   function onConnect() {
  //     console.log("connect");

  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   function onFooEvent(value: any) {
  //     console.log(value, "🔫");

  //     setFooEvents((previous: any) => [...previous, value]);
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);
  //   socket.on("NOTI", onFooEvent);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //     socket.off("NOTI", onFooEvent);
  //   };
  // }, []);

  return (
    <>
      <LandingPage />
      {/* <button
        onClick={async () => {
          const s = await axios.get("/club-network-api/test-ws");
          console.log(s, "😀");
        }}
      >
        Connect
      </button> */}
      {/* <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
      <button
        onClick={async () => {
          try {
            const result = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            console.log(result);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        sign up
      </button>
      <button
        onClick={async () => {
          try {
            const result = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            console.log(result);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        login
      </button>
      <ProfileInfo />
      <NewFeed /> */}
    </>
  );
};

HomePage.Layout = MainLayout;

export default HomePage;
