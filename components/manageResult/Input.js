import {View, Text, TextInput, StyleSheet} from "react-native";
import {GlobalStyles} from "../../constants/styles";

export default function Input({label, invalid, textInputConfig, style}) {
const inputStyles = [styles.input]


if (invalid) {
    inputStyles.push(styles.invalidInput)
}

    return <View style={[styles.inputContainer, style]}>
        <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
        <TextInput style={[styles.input, invalid && styles.invalidInput]} {...textInputConfig} />
    </View>

}
const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
        // minWidth: 100,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        // minWidth: '40%',
        color: GlobalStyles.colors.primary700
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
})