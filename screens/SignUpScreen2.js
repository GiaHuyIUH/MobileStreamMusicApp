import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox"; // Importing Expo's Checkbox component

const SignUpScreen2 = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [isCheckedNews, setIsCheckedNews] = useState(false);
  const [isCheckedMarketing, setIsCheckedMarketing] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.inputPass}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.label}>
          You'll need to confirm this email later.
        </Text>

        {/* Password field */}
        <Text style={styles.PrimaryLabel}>What's your gender?</Text>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={selectedGender}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedGender(itemValue)
            }
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
        {/* Divider */}
        <View style={styles.divider} />

        <View style={styles.containerTerm}>
          {/* Terms of Use Text */}
          <Text style={styles.termsText}>
            By tapping on "Create account", you agree to the spotify Terms of
            Use.
          </Text>

          <TouchableOpacity>
            <Text style={styles.linkText}>Terms of Use</Text>
          </TouchableOpacity>

          <Text style={styles.privacyText}>
            To learn more about how Spotify collects, uses, shares and protects
            your personal data, Please see the Spotify Privacy Policy.
          </Text>

          <TouchableOpacity>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>

          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>
              Please send me news and offers from Spotify.
            </Text>
            <Checkbox
              value={isCheckedNews}
              onValueChange={setIsCheckedNews}
              color={isCheckedNews ? "#1DB954" : undefined} // Custom color when checked
            />
          </View>

          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>
              Share my registration data with Spotify's content.
            </Text>
            <Checkbox
              value={isCheckedMarketing}
              onValueChange={setIsCheckedMarketing}
              color={isCheckedMarketing ? "#1DB954" : undefined} // Custom color when checked
            />
          </View>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
        >
          <TouchableOpacity
            // disabled={email.length || password.length < 8 ? true : false}
            style={{
              backgroundColor: "#ccc",
              borderRadius: 30,
              padding: 15,
              width: "100%",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("ChooseArtistScreen")}
          >
            <Text style={[styles.PrimaryLabel, { color: "#000" }]}>
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Currently Playing Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Easy</Text>
        <Text style={styles.footerSubtitle}>Troye Sivan</Text>
        <Text style={styles.footerInfo}>BEATSPILL+</Text>
      </View>
    </SafeAreaView>
  );
};

const topGenres = [
  { name: "Pop", color: "#5E27FD", image: "https://i.imgur.com/Z7yC4kE.png" },
  { name: "Indie", color: "#2BB673", image: "https://i.imgur.com/TI6H7pe.png" },
];

const podcastCategories = [
  { name: "News & Politics", color: "#007AFF", icon: "https://i.imgur.com/YoN7avT.png" },
  { name: "Comedy", color: "#FF5C5C", icon: "https://i.imgur.com/1c5HTD7.png" },
];

const browseAll = [
  { name: "2021 Wrapped", color: "#5E27FD", icon: "https://i.imgur.com/xHQaXeC.png" },
  { name: "Podcasts", color: "#2BB673", icon: "https://i.imgur.com/1c5HTD7.png" },
  { name: "Made for you", color: "#007AFF", icon: "https://i.imgur.com/1c5HTD7.png" },
  { name: "Charts", color: "#FF5C5C", icon: "https://i.imgur.com/1c5HTD7.png" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollView: {
    padding: 20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#282828",
    borderRadius: 10,
    padding: 10,
    color: "#FFFFFF",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  genreCard: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
    elevation: 5,
  },
  genreImage: {
    width: 60,
    height: 60,
    position: "absolute",
    top: 10,
  },
  genreText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryCard: {
    width: "48%",
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    elevation: 5,
  },
  categoryText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
  },
  categorySubtitle: {
    color: "#B3B3B3",
    fontSize: 12,
  },
  categoryIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 10,
  },
  footer: {
    backgroundColor: "#282828",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerSubtitle: {
    color: "#B3B3B3",
    fontSize: 12,
  },
  footerInfo: {
    color: "#1DB954",
    fontSize: 12,
  },
});

export default SignUpScreen2;
