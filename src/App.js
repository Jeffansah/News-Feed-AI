import React, {useEffect, useState} from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";

import useStyles from './styles';

import NewsCards from "./components/NewsCards/NewsCards";

const alanKey = "a563a308af0faee3a2c099ada24a1c952e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();
    

    useEffect(() => {
        alanBtn({
          key: alanKey,
          onCommand: ({ command, articles, number }) => {
            if (command === 'newHeadlines') {
              setNewsArticles(articles);
              setActiveArticle(-1);
            } else if (command === 'highlight') {
              setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
            } else if (command === 'open') {
              const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
              const article = articles[parsedNumber - 1];
    
              if (parsedNumber > articles.length) {
                alanBtn().playText('Please try that again...');
              } else if (article) {
                window.open(article.url, '_blank');
                alanBtn().playText('Opening...');
              } else {
                alanBtn().playText('Please try that again...');
              }
            }
          }
        })
      }, []);


    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://voicebot.wpenginepowered.com/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} style={{borderRadius: "5px"}} alt="logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle = {activeArticle}/>
        </div>
    );
}

export default App;