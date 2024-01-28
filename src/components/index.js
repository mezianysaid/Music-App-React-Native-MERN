import BottomNavigation from './BottomNavigation';
import _Categories from './_Categories';
import _CategoryCard from './_CategoryCard';

import _ListCard from './_ListCard';
import rap from '../assets/category/rap.jpg';
import rock from '../assets/category/rock.png';
import pop from '../assets/category/pop.jpg';
import jazz from '../assets/category/jazz.png';
import alb1 from '../assets/category/alb1.jpg';
import alb2 from '../assets/category/alb2.png';
import alb3 from '../assets/category/alb3.jpg';
import alb4 from '../assets/category/alb4.png';
import _AlbumCard from './_AlbumCard';
import _songCard from './_songCard';
const data = [
  {
    title: '',
    artist: '',
    image: '',
    category: '',
    id: '',
  },
];
const categories = [
  {
    name: 'Hip Hop',
    image: pop,
  },
  {
    name: 'Jazz',
    image: jazz,
  },
  {
    name: 'Rap',
    image: rap,
  },
  {
    name: 'Rock',
    image: rock,
  },
];
const albums = [
  {
    name: 'Speak Now',
    image: alb1,
    artist: 'Taylor',
  },
  {
    name: 'Fearless',
    image: alb2,
    artist: 'Ed Taylor',
  },
  {
    name: 'Midnights',
    image: alb3,
    artist: 'EdTaylor ',
  },
  {
    name: 'Reputation',
    image: alb4,
    artist: 'Ed sheerne',
  },
];
export {
  BottomNavigation,
  _Categories,
  _CategoryCard,
  categories,
  _ListCard,
  albums,
  _AlbumCard,
  _songCard,
};
