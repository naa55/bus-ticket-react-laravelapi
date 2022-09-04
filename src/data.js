// import icons
import {
    IoLogoYoutube,
    IoLogoFacebook,
    IoLogoGithub,
    IoLogoInstagram,
    IoMdAddCircle,
    IoIosCheckmarkCircle,
    IoIosArrowRoundForward,
  } from 'react-icons/io';
  import MorningOne from './assets/morning-1.jpg';
  import MorningTwo from './assets/morning-2.jpg';
  import EveningOne from './assets/evening-1.jpg';
  import EveningTwo from './assets/evening-2.jpg';
  
  
  export const stats = [
    {
      value: '7',
      text: 'Year Experience',
    },
    {
      value: '2',
      text: 'Opened in the country',
    },
    {
      value: '10k+',
      text: 'Furniture sold',
    },
    {
      value: '260+',
      text: 'Variant Furniture',
    },
  ];
  
  export const hero = {
    items: [
      {
        img: '../../assets/morning-1.jpg',
        title: 'Morning Rides',
        subtitle:
          'Early Morning Rides to Your Destination in CapeCoast',
      },
      {
        img: <EveningOne/>,
        title: 'Evening Rides',
        subtitle:
          'Late Evening Rides to Your Destination in CapeCoast',
      },
      {
        img: <MorningTwo/>,
        title: 'Morning Rides',
        subtitle:
          'Early Morning Rides to Your Destination in CapeCoast',
      },
      {
        img: <EveningTwo/>,
        title: 'Evening Rides',
        subtitle:
          'Late Evening Rides to Your Destination in CapeCoast',
      },
    ],
  };
  export default hero;
  
  
  export const newsletter = {
    title: 'Get more discount Off your order',
    subtitle: 'Join our mailing list',
    placeholder: 'Your email address',
    buttonText: 'Shop Now',
  };
  
  