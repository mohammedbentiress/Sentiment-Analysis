import React from "react";
import search_emojis from "../images/search_emojis.png";
import search_sentiment from "../images/search_sentiments.png";
import sent_graphs from "../images/sentiments_graphs.jpg";
import tweet_speaks from "../images/twitter-speaks.jpg";
import sent_google from "../images/sent-fig-3.jpg";
import ImgCell from "./ImgCell";
import TextCell from "./TextCell";

const features = {
  Images: [
    {
      title: "computer",
      item: search_emojis,
    },
    {
      title: "grapghs",
      item: [tweet_speaks, sent_google, search_sentiment],
      swipeable: true,
    },
    {
      title: "dash",
      item: sent_graphs,
    },
  ],
  Texts: [
    {
      title: "Tweet Prediction",
      button: "TRY IT",
      url: "testmodel",
      item:
        "Have you ever asked your self what would people think about your belifs, sentiments, or opinion. Well we give you the oppurtunity to predict what your tweet will look like in the eye of your followers, all what you have to do is to click on Test Model",
    },
    {
      title: "Topic lookup",
      button: " Process topics",
      url: "topicAnalysis",
      item:
        "You want to buy a new smartphone and you are doubting wich one to choose, or you don't feel confortable with your nike, you want an adivice from other customers just like you who had the experience or you want reviews about a new movie, book or new album , go a head click the button and search by any topic you want and get your reviews ",
    },
    {
      title: "Trends Analysis",
      button: "Find trends",
      url: "trendsAnylsis",
      item:
        "We leave in wide world where social media keep us up to date.  Here you can found the twitter trends in the global world. What is more intresting than getting trends, is to have top tweets attached tothis trend and analyze there sentiment, Click on the button and feel free to get trends reviews",
    },
  ],
};

export default function FeaturesList() {
  return (
    <React.Fragment>
      <div className="featuresList">
        {features.Images.map((Image, index) => {
          if (index % 2 !== 0)
            return (
              <React.Fragment key={index}>
                <ImgCell data={Image} />
                <TextCell data={features.Texts[index]} />
              </React.Fragment>
            );
          else
            return (
              <React.Fragment key={index}>
                <TextCell data={features.Texts[index]} />
                <ImgCell data={Image} />
              </React.Fragment>
            );
        })}
      </div>
    </React.Fragment>
  );
}
