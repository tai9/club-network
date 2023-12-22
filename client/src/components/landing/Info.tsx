import React from "react";
import { InfoLayout } from "./styled";

const data = [
  {
    title: "Be Seen, Be Valued!",
    desc: `With Uncut, immerse yourself in a space where your creativity gains
    the recognition it deserves. Let your art spark conversations, gain
    accolades, and set the stage for lasting impressions.`,
    img: "https://ik.imagekit.io/n8imvdjvz/tr:w-1024,h-1024/https://storage.googleapis.com/uncut-fm-production/production/home/info_first.webp",
  },
  {
    title: "Collaborate and Innovate!",
    desc: `Explore realms of artistic expressions and connect with like-minded
    creators. Uncut is your canvas for boundless collaborations and a
    wellspring of inspiration. Join us and fuel your creative journey!`,
    img: "https://ik.imagekit.io/n8imvdjvz/tr:w-1024,h-1024/https://storage.googleapis.com/uncut-fm-production/production/home/info_second.webp",
  },
  {
    title: "Forge Your Tribe!",
    desc: `Craft your space; bring or create collections. Uncut is where bonds deepen and communities bloom. Know your members and make every collector a vital part of your journey!`,
    img: "https://ik.imagekit.io/n8imvdjvz/tr:w-1024,h-1024/https://storage.googleapis.com/uncut-fm-production/production/home/info_third.webp",
  },
  {
    title: "Secure Your Creations!",
    desc: `Ensure the integrity and uniqueness of your digital collectibles with Uncut's on-chain protection. Your creations are yours alone, safeguarded within your own smart contract.`,
    img: "https://ik.imagekit.io/n8imvdjvz/tr:w-1024,h-1024/https://storage.googleapis.com/uncut-fm-production/production/home/info_fourth.webp",
  },
  {
    title: "Earn from Your Passion!",
    desc: `Monetize your creativity seamlessly with Uncut. Break free from intermediaries and revel in the freedom to turn your artistic pursuits into rewarding experiences.`,
    img: "https://ik.imagekit.io/n8imvdjvz/tr:w-1024,h-1024/https://storage.googleapis.com/uncut-fm-production/production/home/info_fifth.webp",
  },
];

const Info = () => {
  return (
    <InfoLayout>
      <div className="heading">Empowering Your Artistic Journey</div>

      {data.map(({ title, desc, img }, idx) => (
        <div key={idx} className="section">
          <div className={`info ${idx % 2 !== 0 ? "section-2" : ""}`}>
            <div className="title">{title}</div>
            <div className="desc">{desc}</div>
          </div>
          <img src={img} alt="" />
        </div>
      ))}
    </InfoLayout>
  );
};

export default Info;
