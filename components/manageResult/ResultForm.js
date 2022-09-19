import { useState, useEffect } from "react";
import { View, Switch, Text, StyleSheet, TextInput } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import SearchBarDropdown from "../SearchBarDropdown";

export default function ResultForm({
  onCancel,
  onSubmit,
  isEditing,
  submitButtonLabel,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    course: defaultValues ? defaultValues.course : "",
    date: defaultValues
      ? getFormattedDate(defaultValues.date)
      : dateInputHandler(),
    major: defaultValues ? defaultValues.major : false,
    result: defaultValues ? defaultValues.result.toString() : 0,
    amount: defaultValues ? defaultValues.amount.toString() : 0,
  });

  const [selectedItem, setSelectedItem] = useState("");
  const [dataSource] = useState([
    "Wiskunde",
    "Engels",
    "Frans",
    "Duits",
    "Nederlands",
    "Geschiedenis",
    "Aardrijkskunde",
    "Biologie",
    "Natuurkunde",
    "Muziek",
    "Gym",
  ]);

  const onSelect = (item) => {
    setSelectedItem(item);
  };

  function dateInputHandler() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const monthOutput = month < 10 ? "0" + month : month;
    const year = today.getFullYear();
    return year + "-" + monthOutput + "-";
  }

  function amountHandler() {
    const result = inputs.result;

    function setInputsHandler(amount) {
      setInputs((curInputs) => {
        return {
          ...curInputs,
          amount: amount,
        };
      });
    }

    if (result < 5.5 && inputs.major) {
      setInputsHandler(-2.5);
    }
    if (result < 4 && inputs.major) {
      setInputsHandler(-5.0);
    }
    if (result < 5.5 && !inputs.major) {
      setInputsHandler(-1.25);
    }
    if (result < 4 && !inputs.major) {
      setInputsHandler(-2.5);
    }
    if (result >= 5.5 && inputs.major) {
      setInputsHandler(2.5);
    }
    if (result >= 7.5 && inputs.major) {
      setInputsHandler(5.0);
    }
    if (result >= 5.5 && !inputs.major) {
      setInputsHandler(1.25);
    }
    if (result >= 7.5 && !inputs.major) {
      setInputsHandler(2.5);
    }
  }

  useEffect(() => {
    amountHandler();
  }, [inputs.result, inputs.major]);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: enteredValue,
      };
    });
  }
  function courseHandler(course) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        course: course,
      };
    });
  }

  function submitHandler() {
    console.log("input values", inputs);
    amountHandler();
    const resultData = {
      course: inputs.course,
      date: new Date(inputs.date),
      major: inputs.major,
      result: inputs.result,
      amount: inputs.amount,
    };

    onSubmit(resultData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.titleStyle}>Jouw resultaat</Text>

      <SearchBarDropdown
        dataSource={dataSource}
        onSelect={onSelect}
        courseHandler={courseHandler}
        course={inputs.course}
        style={styles.dropdown}
      />

      <View style={styles.switchContainer}>
        <Text
          style={
            !inputs.major
              ? [styles.label, styles.activeMinor]
              : [styles.label, styles.left]
          }
        >
          SO
        </Text>
        <Switch
          trackColor={{
            false: GlobalStyles.colors.minor,
            true: GlobalStyles.colors.major,
          }}
          thumbColor={
            inputs.major
              ? GlobalStyles.colors.primary50
              : GlobalStyles.colors.primary50
          }
          ios_backgroundColor={GlobalStyles.colors.minor}
          onValueChange={inputChangedHandler.bind(this, "major")}
          value={inputs.major}
          style={styles.switch}
        />
        <Text
          style={
            inputs.major ? [styles.label, styles.activeMajor] : [styles.label]
          }
        >
          Proefwerk
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          style={styles.rowInput}
          label="Datum"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            keyboardType: "number-pad",
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Cijfer"
          textInputConfig={{
            keyboardType: "numbers-and-punctuation",
            onChangeText: inputChangedHandler.bind(this, "result"),
            value: inputs.result,
          }}
        />
      </View>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    marginTop: 30,
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
    textAlign: "center",
  },
  dropdown: {
    marginHorizontal: 4,
    backgroundColor: "red,",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  switch: {
    marginHorizontal: 30,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    minWidth: 80,
  },
  left: {
    textAlign: "right",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  activeMinor: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "right",
    color: GlobalStyles.colors.minor,
  },
  activeMajor: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "left",
    color: GlobalStyles.colors.major,
  },
  searchbar: {
    backgroundColor: GlobalStyles.colors.error50,
    height: 30,
    borderRadius: 6,
  },
});
