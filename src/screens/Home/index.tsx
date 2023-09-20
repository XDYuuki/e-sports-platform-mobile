import { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";

import logoImg from "../../assets/logo-nlw-esports.png";

import { GameCard, GameCardProps } from "../../components/GameCard";
import Heading from "../../components/Header";
import Background from "../../components/Background";

export function Home() {
    const [games, setGames] = useState<GameCardProps[]>([]);

    useEffect(() => {
        fetch("http://192.168.2.12:3000/games")
            .then((response) => response.json())
            .then((data) => {
                setGames(data);
            });
    }, []);

    const navigation = useNavigation();

    function HandleOpenGame({ id, title, bannerUrl }: GameCardProps) {
        navigation.navigate("game", { id, title, bannerUrl });
    }

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <Image source={logoImg} style={styles.logo} />
                <Heading
                    title="Find your duo!"
                    subtitle="Select the game you want to play..."
                />

                <FlatList
                    data={games}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <GameCard
                            data={item}
                            onPress={() => HandleOpenGame(item)}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                />
            </SafeAreaView>
        </Background>
    );
}
