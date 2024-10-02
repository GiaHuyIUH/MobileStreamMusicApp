import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet } from "react-native";

export default (TrackViewScreen) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    {/* Header without gradient background */}
                    <View style={styles.header}>
                        <View style={styles.headerRow}>
                            {/* Left icon */}
                            <Image
                                source={{ uri: "../assets/images/listicon.png" }}
                                resizeMode={"stretch"}
                                style={styles.iconSmall}
                            />
                            <Text style={styles.headerTitle}>{"1(Remastered)"}</Text>
                            {/* Right icon */}
                            <Image
                                source={{ uri: "../assets/images/3dots.png" }}
                                resizeMode={"stretch"}
                                style={styles.iconTiny}
                            />
                        </View>

                        {/* Main image */}
                        <Image
                            source={{ uri: "../assets/images/Artist1.png" }}
                            resizeMode={"stretch"}
                            style={styles.mainImage}
                        />

                        {/* Song details */}
                        <View style={styles.songDetails}>
                            <View style={styles.songInfo}>
                                <Text style={styles.songTitle}>{"From Me to You - Mono / Remast"}</Text>
                                <Text style={styles.songArtist}>{"The Beatles"}</Text>
                            </View>
                            <Image
                                source={{ uri: "../assets/images/hearticon.png" }}
                                resizeMode={"stretch"}
                                style={styles.iconMedium}
                            />
                        </View>

                        {/* Progress bar */}
                        <View style={styles.progressBarContainer}>
                            <View style={styles.progressBarBackground}>
                                <View style={styles.progressBarForeground} />
                            </View>
                        </View>

                        {/* Time display */}
                        <View style={styles.timeContainer}>
                            <Text style={styles.timeText}>{"0:38"}</Text>
                            <Text style={styles.timeText}>{"-1:18"}</Text>
                        </View>

                        {/* Controls */}
                        <View style={styles.controls}>
                            <Image
                                source={{ uri: "../assets/images/download.png" }}
                                resizeMode={"stretch"}
                                style={styles.iconControl}
                            />
                            <Image
                                source={{ uri: "../assets/images/redirect_inadvance.png" }}
                                resizeMode={"stretch"}
                                style={styles.iconControl}
                            />
                            <View style={styles.playPauseContainer}>
                                <Image
                                    source={{ uri: "../assets/images/playicon.png" }}
                                    resizeMode={"stretch"}
                                    style={styles.playPauseIcon}
                                />
                            </View>
                            <Image
                                source={{ uri: "../assets/images/redirect_next.png" }}
                                resizeMode={"stretch"}
                                style={styles.iconControl}
                            />
                            <Image
                                source={{ uri: "../assets/images/resume.png" }}
                                resizeMode={"stretch"}
                                style={styles.iconControl}
                            />
                        </View>

                        {/* Footer */}
                        <View style={styles.footer}>
                            <View style={styles.footerLeft}>
                                <Image
                                    source={{ uri: "../assets/images/bluetooth.png" }}
                                    resizeMode={"stretch"}
                                    style={styles.iconSmall}
                                />
                                <Text style={styles.footerText}>{"BEATSPILL+"}</Text>
                            </View>
                            <View style={styles.footerRight}>
                                <Image
                                    source={{ uri: "../assets/images/share.png" }}  
                                    resizeMode={"stretch"}
                                    style={styles.iconControl}
                                />
                                <Image
                                    source={{ uri: "../assets/images/displaylist.png" }}
                                    resizeMode={"stretch"}
                                    style={styles.iconLarge}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Lyrics section */}
                    <View style={styles.lyricsContainer}>
                        <View style={styles.lyricsRow}>
                            <Text style={styles.lyricsText}>{"Lyrics"}</Text>
                            <View style={styles.moreButton}>
                                <Text style={styles.moreText}>{"MORE"}</Text>
                                <Image
                                    source={{ uri: "../assets/images/zoom.png" }}
                                    resizeMode={"stretch"}
                                    style={styles.iconTiny}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#121212",
    },
    container: {
        flex: 1,
        alignItems: 'center',  // Ensures that the container centers its children
    },
    header: {
        backgroundColor: "#962419", 
        paddingTop: 58,
        paddingBottom: 70,
        width: '100%',  
        alignItems: 'center',
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        width: '90%',  
    },
    iconSmall: {
        width: 24,
        height: 24,
    },
    iconTiny: {
        width: 20,
        height: 20,
    },
    headerTitle: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    mainImage: {
        height: 360,
        width: '90%',  
        marginBottom: 40,
    },
    songDetails: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 15,
    },
    songInfo: {
        flex: 1,
    },
    songTitle: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 6,
    },
    songArtist: {
        color: "#B3B3B3",
        fontSize: 16,
        fontWeight: "bold",
    },
    iconMedium: {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },
    progressBarContainer: {
        width: '90%',
        marginBottom: 10,
    },
    progressBarBackground: {
        backgroundColor: "#777777",
        borderRadius: 4,
        height: 6,
    },
    progressBarForeground: {
        width: 128,
        height: 6,
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '90%',
        marginBottom: 10,
    },
    timeText: {
        color: "#B2B2B2",
        fontSize: 14,
        fontWeight: "bold",
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-evenly",  
        alignItems: "center",
        width: '90%',
        marginBottom: 30,
    },
    iconControl: {
        width: 35,
        height: 35,
    },
    playPauseContainer: {
        width: 67,
        height: 67,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 35,
        backgroundColor: "#FFFFFF",
    },
    playPauseIcon: {
        width: 40,
        height: 40,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '90%',
        marginBottom: 30,
    },
    footerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    footerRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    footerText: {
        color: "#17B54E",
        fontSize: 12,
        marginLeft: 5,  
    },
    iconLarge: {
        width: 20,
        height: 25,
        marginLeft: 15, 
    },
    lyricsContainer: {
        marginTop: 20,
        backgroundColor: "#D8672A",
        borderRadius: 7,
        paddingHorizontal: 16,
        paddingVertical: 10,
        width: '90%',
    },
    lyricsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    lyricsText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
    },
    moreButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#6B3311",
        borderRadius: 21,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    moreText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "bold",
    }
});
