import sunnyLogo from '@salesforce/resourceUrl/WeatherSunny';
import cloudyLogo from '@salesforce/resourceUrl/WeatherCloudy';
import rainyLogo from '@salesforce/resourceUrl/WeatherRainy';
import snowyLogo from '@salesforce/resourceUrl/WeatherSnowy';
import thunderLogo from '@salesforce/resourceUrl/WeatherThunderstorm';
import tempLogo from '@salesforce/resourceUrl/tempLogo';
import dropLogo from '@salesforce/resourceUrl/dropLogo';
import tempLogoWhite from '@salesforce/resourceUrl/tempLogoWhite';
import dropLogoWhite from '@salesforce/resourceUrl/dropLogoWhite';

const weatherFormatMap= {
        'Sunny':         {'logo': sunnyLogo,    'class': 'light-blue-class', 'tempLogo':tempLogoWhite, 'dropLogo':dropLogoWhite},
        'Partly Cloudy': {'logo': cloudyLogo,   'class': 'gray-class',       'tempLogo':tempLogo, 'dropLogo':dropLogo},
        'Snowy':         {'logo': snowyLogo,    'class': '',                 'tempLogo':tempLogo, 'dropLogo':dropLogo},
        'Thunderstorms': {'logo': thunderLogo,  'class': 'dark-gray-class',  'tempLogo':tempLogoWhite, 'dropLogo':dropLogoWhite},
        'Rainy':         {'logo': rainyLogo,    'class': 'gray-class',       'tempLogo':tempLogo, 'dropLogo':dropLogo},
    };

export {weatherFormatMap};