import {View, Image, FlatList} from 'react-native';

import { styles } from './styles';

import {GAMES} from '../../utils/games';

import logoImg from '../../assets/logo-nlw-esports.png'

import Header from '../../components/Header';
import { GameCard } from '../../components/GameCard';

export function Home(){
    return(
        <View style={styles.container}>
            <Image source={logoImg} style={styles.logo}/>
            <Header title='Find your duo!' subtitle='Select the game you want to play...'></Header>

                <FlatList
                    contentContainerStyle={styles.constentList}
                    data={GAMES} 
                    keyExtractor={item => item.id} 
                    renderItem={({item})=>(
                        <GameCard data={item} />
                    )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                />

        </View>
    )
}