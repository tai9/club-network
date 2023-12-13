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

const auth = getAuth(firebase_app);

const HomePage = () => {
  const email = "159iker@gmail.com";
  const password = "123456";
  const { data } = useSession();
  console.log(data, "🔫");

  return (
    <div>
      <button onClick={() => signIn()}>Sign in</button>
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
      <NewFeed />
    </div>
  );
};

HomePage.Layout = MainLayout;

export default HomePage;
