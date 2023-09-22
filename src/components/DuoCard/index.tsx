import { Text, TouchableOpacity, View } from "react-native";
import { GameController } from "phosphor-react-native";

import { styles } from "./styles";
import { DuoInfo } from "../DuoInfo";
import { THEME } from "../../theme";

export interface DuoCardProps {
    hourEnd: string;
    hourStart: string;
    id: string;
    name: string;
    useVoiceChannel: boolean;
    weekDays: string[];
    yearsPlaying: number;
}

interface Props {
    data: DuoCardProps;
    onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
    return (
        <View style={styles.container}>
            <DuoInfo label="Name" value={data.name} />
            <DuoInfo
                label="Playing time"
                value={`${data.yearsPlaying} years`}
            />
            <DuoInfo
                label="Availability"
                value={`${data.weekDays.length} days \u2022 ${data.hourStart}h - ${data.hourEnd}h`}
            />
            <DuoInfo
                label="Voice chat?"
                value={data.useVoiceChannel ? "Yes" : "No"}
                colorValue={
                    data.useVoiceChannel
                        ? THEME.COLORS.SUCCESS
                        : THEME.COLORS.ALERT
                }
            />

            <TouchableOpacity style={styles.button} onPress={onConnect}>
                <GameController color={THEME.COLORS.TEXT} size={20} />
                <Text style={styles.buttonTitle}>Connect</Text>
            </TouchableOpacity>
        </View>
    );
}
