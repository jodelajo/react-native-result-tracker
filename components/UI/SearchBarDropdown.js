import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { ResultsContext } from "../../store/results-context";

export default function SearchBarDropdown(props) {
  const {
    onSelect = () => {},
    courseHandler = () => {},
    course,
    invalid,
  } = props;
  const [showOptions, setShowOptions] = useState(false);

  const coursesCtx = useContext(ResultsContext);
  console.log(coursesCtx.courses)

  const onSelectedItem = (item) => {
    setShowOptions(false);
    onSelect(item);
    courseHandler(item);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={[styles.dropdownStyle, invalid && styles.invalidInput]}
        activeOpacity={0.8}
        onPress={() => setShowOptions(!showOptions)}
      >
        <Text>{!!course ? course : "Kies een vak"}</Text>
        <View
          style={[
            styles.arrow,
            {
              transform: [
                {
                  rotate: showOptions ? "225deg" : "45deg",
                },
              ],
            },
          ]}
        ></View>
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.dropdown}>
          {coursesCtx.courses !== null && coursesCtx.courses !== "" && coursesCtx.courses !== undefined && coursesCtx.courses.length !== 0 ? (
            coursesCtx.courses.map((item) => {
              return (
                <View key={item} style={styles.item}>
                  <TouchableOpacity onPress={() => onSelectedItem(item)}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <View style={styles.item}>
              <Text>Zie je nog geen vakken? Ga dan naar je account en stel daar je vakkenpakket in.</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    position: "relative",
    marginHorizontal: 4,
    zIndex: 10,
  },
  dropdownStyle: {
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary100,
    flexDirection: "row",
    borderRadius: 6,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  arrow: {
    marginRight: 6,
    width: 12,
    height: 12,
    borderBottomColor: GlobalStyles.colors.primary800,
    borderBottomWidth: 2,
    borderRightColor: GlobalStyles.colors.primary800,
    borderRightWidth: 2,
  },
  dropdown: {
    backgroundColor: GlobalStyles.colors.primary50,
    position: "absolute",
    width: "100%",
    top: 50,
    left: 0,
    borderRadius: 8,
    padding: 12,
  },
  item: {
    padding: 8,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
