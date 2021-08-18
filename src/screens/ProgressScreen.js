import React from "react";
import { View, Text, StatusBar, Dimensions } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
// import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};
const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Rainy Days"] // optional
};

const ProgressScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            <Text>Progress Screen</Text>
            {/* <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
            /> */}
        </View>
    );
};

export default ProgressScreen;