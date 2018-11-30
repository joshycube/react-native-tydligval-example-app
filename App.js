import React, { Fragment } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  findNodeHandle,
  InteractionManager
} from "react-native";
import ValPicker from "react-native-tydligval";

const fontColor = "#000";

const createItems = many => {
  const items = [];
  let i = 0;

  while (i < many + 1) {
    items.push({
      id: `${i}item`,
      value: `${i}Value`,
      label: `Value ${i}`
    });
    i++;
  }

  return items;
};

const items = createItems(100);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionOne: items[0].value,
      selectionTwo: items[0].value
    };
  }

  onSelect = selected => {
    this.setState({
      selectionOne: selected.value
    });
  };

  onSelectOther = selected => {
    this.setState({
      selectionTwo: selected.value
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.absolute}
          source={require("./assets/desert.jpg")}
        />
        <Fragment>
          {/* DEFAULT */}
          <Fragment>
            <Text style={{ color: fontColor }}>Default selector</Text>
            <Text style={{ color: fontColor }}>
              Selected value: {this.state.selectionOne}
            </Text>
            <ValPicker
              source={require("./assets/desert.jpg")}
              key="picker-one"
              onSelect={selected => this.onSelect(selected)}
              items={items}
              color={fontColor}
            />
          </Fragment>
          {/* CUSTOM */}
          <Fragment>
            <Text style={{ color: fontColor }}>Customized selector</Text>
            <Text style={{ color: fontColor }}>
              Selected value: {this.state.selectionTwo}
            </Text>
            <ValPicker
              source={require("./assets/desert.jpg")}
              key="picker-two"
              onSelect={selected => this.onSelectOther(selected)}
              items={items}
              triggerButton={(items, onPress, selected) => (
                <TouchableOpacity onPress={onPress}>
                  <Text style={{ color: fontColor, fontWeight: "bold" }}>
                    {selected ? selected.label : "Select a value -- click here"}
                  </Text>
                </TouchableOpacity>
              )}
              selectButton={(item, onSelect) => (
                <TouchableOpacity key={item.id} onPress={() => onSelect(item)}>
                  <Text style={{ color: fontColor }}>{item.label}</Text>
                </TouchableOpacity>
              )}
              closeButton={onClose => (
                <TouchableOpacity onPress={() => onClose()}>
                  <Text style={{ color: fontColor, paddingBottom: 55 }}>
                    Close ME
                  </Text>
                </TouchableOpacity>
              )}
            />
          </Fragment>
        </Fragment>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1
  },
  absolute: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

export default App;
