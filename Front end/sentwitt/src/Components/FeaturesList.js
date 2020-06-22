import React from 'react';
import twetter_emojis from "../images/twitter_emojis.jpeg";
import search_emojis from "../images/search_emojis.png";
import search_sentiment from "../images/search_sentiments.png";
import sent_graphs from'../images/sentiments_graphs.jpg';
import sent_dash from'../images/sent_dashboard.png';
import tweet_speaks from '../images/twitter-speaks.jpg';
import sent_google from '../images/sent-fig-3.jpg';
import ImgCell from "./ImgCell";
import TextCell from "./TextCell";

const features = {
    Images : [
    {
        title: "computer",
        item: search_emojis,
    },
    {   
        title: "grapghs",
        item: [tweet_speaks,sent_google,search_sentiment],
        swipeable: true,
    },
    {
        title: "dash",
        item: sent_graphs,
    },
    ]
    ,
    Texts : [
        {
            title:"computer",
            item:">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nisi quod tenetur exercitationem natus, hic, harum reiciendis a ipsa omnis cum laboriosam, suscipit sapiente. Perferendis, molestiae ipsam temporibus nesciunt eius, explicabo praesentium adipisci excepturi inventore eos accusantium aliquam iusto! Molestiae esse magnam aperiam est obcaecati amet saepe debitis, sequi blanditiis, ",
        },
        {   
            title:"grapghs",
            item:">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nisi quod tenetur exercitationem natus, hic, harum reiciendis a ipsa omnis cum laboriosam, suscipit sapiente. Perferendis, molestiae ipsam temporibus nesciunt eius, explicabo iam est obcaecati amet saepe debitis, sequi blanditiis, nemo eaque praesentium et dignissimos quasimos. Ut minus numquam optio est vero maiores earum voluptas iusto aliquam iste!",
        },
        {
            title:"dash",
            item:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nisi quod tenetur exercitationem natus, hic, harum reiciendis a ipsa omnis cum laboriosam,  fuga praesentium, reiciendis perspiciatis velit! Et tempore, nobis porro velit eaque dignissimos. Ut minus numquam optio est vero maiores earum voluptas iusto aliquam iste!",
        },
    ]
};

export default function FeaturesList() {
    return(
        <React.Fragment>
            <div className="featuresList">{
                features.Images.map((Image,index)=>{
                    if(index%2!=0)return(
                        <>
                            <ImgCell data={Image}/>
                            <TextCell data={features.Texts[index]}/>
                        </>
                    )
                    else return(
                        <>
                            <TextCell data={features.Texts[index]}/>
                            <ImgCell data={Image}/>
                        </>
                    )
                })}
            </div>
        </React.Fragment>
    );
}
