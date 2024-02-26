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

    const createMeme = async (top: string, bottom: string, meme: string): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            setTimeout(async () => {
                try {
                    const response = await axios.get('https://media-gru2-2.cdn.whatsapp.net/v/t61.24694-24/377401018_627746236171127_2543461440571627292_n.jpg?ccb=11-4&oh=01_AdToauQ00C2U_MRQEBCqOjgc83RR6uTm8hzJT74pwRk_HQ&oe=65E9CC51&_nc_sid=e6ed6c&_nc_cat=100', {responseType: 'blob'});
                    resolve(response);
                } catch (error) {
                    reject(error);
                }
            }, 2000);
        });
    };    

    return {
        getTrending,
        getMemes,
        createMeme
    }
}