import axios from 'axios';
import trending from '../assets/trending.json';
import { memes } from '../assets/list';

export interface TrendingMeme {
    title: string,
    url: string,
    created_utc: number
}

export interface Meme {
    name: string,
    image: any
}

export const useApi = () => {

    const getTrending = async(): Promise<TrendingMeme[]> => {
        // const result = await axios.get('https://reddit-meme.p.rapidapi.com/memes/trending', {
        //     headers: {
        //         'X-RapidAPI-Key': '46db898a72msh259f4bf0c4edbe2p1c51f9jsneb2c0e5395ea',
        //         'X-RapidAPI-Host': 'reddit-meme.p.rapidapi.com'
        //       }
        // });
        // return result.data;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(trending)
            }, 1000)
        })
    };

    const getMemes = async (): Promise<Meme[]> => {
        return new Promise((resolve, reject) => {
            try {
                let result: Meme[] = [];
    
                Object.entries(memes).forEach(([key, value]) => {
                    result.push({
                        name: key,
                        image: value
                    });
                });
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    };

    return {
        getTrending,
        getMemes
    }
}