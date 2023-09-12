import {View, ImageBackground, TouchableOpacity, TouchableOpacityProps, ImageSourcePropType, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { THEME } from '../../theme';

export interface GameCardProps {
    id: string,
    name: string,
    ads: string,
    cover: ImageSourcePropType,
}

interface Props extends TouchableOpacityProps{
    data: GameCardProps
}

export function GameCard({data, ...rest}: Props){
    return(
        <TouchableOpacity style={styles.container}>
            <ImageBackground source={data.cover} style={styles.cover} {...rest}>

                <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
                    <Text style={styles.name}>
                        {data.name}
                    </Text>
                    <Text style={styles.ads}>
                        {data.ads} posts 
                    </Text>
                </LinearGradient>
            </ImageBackground>

        </TouchableOpacity>
    )
}