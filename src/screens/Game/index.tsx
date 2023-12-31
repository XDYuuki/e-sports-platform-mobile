import { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import logoImg from "../../assets/logo-nlw-esports.png";

import { THEME } from "../../theme";
import { styles } from "./styles";

import { GameParams } from "../../@types/navigation";
import Background from "../../components/Background";
import Heading from "../../components/Header";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";

function EmpyListMessage() {
    return (
        <Heading
            title="Sorry for that!"
            subtitle="We still dont have ads for this game. :("
        />
    );
}

export function Game() {
    const [ads, setAds] = useState<DuoCardProps[]>([]);
    const route = useRoute();
    const game = route.params as GameParams;

    const navigation = useNavigation();
    function handleGoBack() {
        navigation.goBack();
    }

    useEffect(() => {
        fetch(`http://192.168.2.12:3000/games/${game.id}/ads`)
            .then((response) => response.json())
            .then((data) => {
                setAds(data);
            });
    }, []);

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>
                    <Image source={logoImg} style={styles.logo} />

                    <View style={styles.right} />
                </View>

                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.cover}
                    resizeMode="cover"
                />

                <Heading
                    title={game.title}
                    subtitle="Connect and start playing"
                />

                <FlatList
                    data={ads}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <DuoCard
                            data={item}
                            onConnect={() => {
                                console.log("DuoCard onPress event.");
                            }}
                        />
                    )}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={
                        ads.length > 0 ? styles.contentList : styles.emptyList
                    }
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={EmpyListMessage}
                />
            </SafeAreaView>
        </Background>
    );
}
