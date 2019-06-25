import React, { Component, useState, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  RefreshControlProps,
  TouchableOpacity
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView
} from "react-native-tab-view";
import styled from "styled-components/native";
import theme from "../theme";

const StyledRefreshView = styled.View`
  height: 40;
`;

const coverAvatarSize = size => {
  switch (size) {
    case "L":
      return 80;
    case "M":
      return 40;
    default:
      return 40;
  }
};

export const Avatar = styled.Image`
  width: ${props => coverAvatarSize(props.size)};
  height: ${props => coverAvatarSize(props.size)};
  border-radius: ${props => coverAvatarSize(props.size) / 2 + "px"};
  background: #ccc;
`;

const StyledMessageItem = styled.TouchableOpacity`
  padding: 16px 0;
  border-color: #d0d0d5;
  flex-direction: row;

  :active {
    background: red;
  }
`;

const MessageHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MessageWrap = styled.View`
  margin-left: 16px;
  flex: 1;
`;

const MessageTagText = styled.Text`
  color: #e9754e;
  font-size: 14px;
  margin-left: 5px;
`;

const MessageReadStatus = ({ isRead }: { isRead: boolean }) => {
  if (isRead) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: "#E9754E",
        width: 48,
        height: 20,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ color: "#fff" }}>未読</Text>
    </View>
  );
};

const MessageTag = ({ text, onPress }) => {
  return (
    <TouchableOpacity>
      <MessageTagText>[{text}]</MessageTagText>
    </TouchableOpacity>
  );
};

const MessageUsername = styled.Text`
  font-size: 16px;
  color: #493b32;
  text-align: left;
  line-height: 24px;
`;

const MessageContent = styled.Text`
  font-size: 14px;
  color: #493b32;
  text-align: left;
  line-height: 20px;
`;

interface IMessageItemProps {
  data: IMessageData;
}

const MessageItem = ({ data }: IMessageItemProps) => {
  return (
    <>
      <StyledMessageItem activeOpacity={0.8}>
        <Avatar />
        <MessageWrap>
          <MessageHeader>
            <MessageUsername>{data.name}</MessageUsername>
            <Text style={[styles.date]}>{data.date}</Text>
          </MessageHeader>
          <View>
            <MessageContent numberOfLines={2}>{data.content}</MessageContent>
            <View
              style={{
                flexDirection: "row",
                marginTop: 3,
                alignItems: "center"
              }}
            >
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Text style={[styles.date]}>{data.date2}</Text>
                {data.tag.map((tag, index) => (
                  <MessageTag key={index} text={tag} />
                ))}
              </View>
              <MessageReadStatus isRead={data.read === 1} />
            </View>
          </View>
        </MessageWrap>
      </StyledMessageItem>
      <View style={{ height: 1, backgroundColor: "#D0D0D5", opacity: 0.5 }} />
    </>
  );
};

interface ISecondRouteProps {
  index: number;
}

interface IMessageData {
  id: number;
  name: string;
  content: string;
  date: string;
  date2: string;
  tag: string[];
  read: number;
}

const testData: IMessageData[] = [
  {
    id: 1,
    name: "中田 島世",
    content: "夏休み活動調査",
    date: "5/15 15:06",
    date2: "5月24日",
    tag: ["アンケート"],
    read: 0
  },
  {
    id: 2,
    name: "中田 島世",
    content: "夏休み活動調査",
    date: "5/15 15:06",
    date2: "5月24日",
    tag: [],
    read: 1
  },
  {
    id: 3,
    name: "中田 島世",
    content: "夏休み活動調査",
    date: "5/15 15:06",
    date2: "5月24日",
    tag: [],
    read: 1
  }
];

const getData = (status, page) => {
  return new Promise<IMessageData[]>(resolve => {
    const filteredList = testData.filter(x => {
      if (status !== undefined) {
        return x.read === status;
      }

      return true;
    });

    setTimeout(() => {
      resolve(filteredList);
    }, 500);
  });
};

const transformIndexToReadStatus = index => {
  switch (index) {
    case 0:
      return undefined;
    case 1:
      return 1;
    case 2:
      return 0;
  }
};

const SecondRoute = (props: ISecondRouteProps) => {
  const [isRefreshIng, setRefresh] = useState(false);
  const [dataList, setDataList] = useState<IMessageData[]>([]);

  useEffect(() => {
    // reload data
    setRefresh(true);

    getData(transformIndexToReadStatus(props.index), 0).then(res => {
      setDataList(res);

      setRefresh(false);
    });
  }, [props.index]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={dataList}
        keyExtractor={item => {
          console.log(item);

          return item.id + "";
        }}
        refreshing={isRefreshIng}
        onRefresh={() => {
          setRefresh(true);
          setTimeout(() => {
            setRefresh(false);
          }, 500);
        }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={item => <MessageItem data={item.item} />}
      />
    </View>
  );
};

const SecondNav = styled.View`
  background: #ffffff;
  height: 48px;
  flex-direction: row;
`;

const SecondNavWrap = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const A = styled(Animated.View)`
  position: absolute;
  width: ${Dimensions.get("window").width / 3};
  height: 3px;
  bottom: 0;
  align-items: center;
`;

// function runTiming(clock, value, dest) {
//   const state = {
//     finished: new Animated.Value(0),
//     position: new Animated.Value(0),
//     time: new Animated.Value(0),
//     frameTime: new Animated.Value(0)
//   };

//   const config = {
//     duration: 200,
//     toValue: new Animated.Value(0),
//     easing: Easing.inOut(Easing.ease)
//   };

//   return Animated.block([
//     Animated.cond(
//       Animated.clockRunning(clock),
//       [
//         // if the clock is already running we update the toValue, in case a new dest has been passed in
//         Animated.set(config.toValue, dest)
//       ],
//       [
//         // if the clock isn't running we reset all the animation params and start the clock
//         Animated.set(state.finished, 0),
//         Animated.set(state.time, 0),
//         Animated.set(state.position, value),
//         Animated.set(state.frameTime, 0),
//         Animated.set(config.toValue, dest),
//         Animated.startClock(clock)
//       ]
//     ),
//     // we run the step here that is going to update position
//     Animated.timing(clock, state, config),
//     // if the animation is over we stop the clock
//     Animated.cond(
//       state.finished,
//       console.log("stop clock", Animated.stopClock(clock))
//     ),
//     // we made the block return the updated position
//     state.position
//   ]);
// }

class FirstRoute extends Component {
  state = {
    index: 0,
    routes: [
      { key: "1", title: "すべて" },
      { key: "2", title: "既読" },
      { key: "3", title: "未読" }
    ]
  };

  clock = new Animated.Clock();

  transX = new Animated.Value(0);

  _config2 = {
    duration: 300,
    toValue: 0,
    easing: Easing.inOut(Easing.ease)
  };

  //anim = Animated.spring(this.transX, this._config2);

  render() {
    // const inputRange = this.state.routes.map((_, i) => i);

    // const a = Animated.interpolate(this.position, {
    //   inputRange: inputRange,
    //   outputRange: inputRange.map(i => (i + 1) * 10)
    // });

    return (
      <View style={{ flex: 1 }}>
        <SecondNav
          style={{
            elevation: 4,
            borderTopWidth: 0,
            shadowColor: "#000000",
            shadowOffset: { height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3
          }}
        >
          {this.state.routes.map((item, index) => {
            return (
              <SecondNavWrap
                key={item.key}
                onPress={() => {
                  Animated.timing(this.transX, {
                    toValue: index,
                    duration: 300,
                    easing: Easing.back(0)
                  }).start();

                  this.setState({
                    index: index
                  });
                }}
              >
                <Animated.Text>{item.title} </Animated.Text>
              </SecondNavWrap>
            );
          })}
          <A
            style={{
              left: Animated.multiply(
                Dimensions.get("window").width / 3,
                this.transX
              )
            }}
          >
            <View
              style={{
                backgroundColor: "#fddc3e",
                width: "80%",
                height: "100%",
                borderRadius: 4
              }}
            />
          </A>
        </SecondNav>
        <SecondRoute index={this.state.index} />
      </View>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: papayawhip;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: palevioletred;
`;

const ButtonContainer = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  padding: 12px;
  border-radius: 10px;
`;

const StyledMenuContainer = styled.View`
  height: 40px;
  background-color: ${props => props.theme.colors.main};
`;

const MenuItem = styled.TouchableOpacity`
  height: 100%;
  padding: 0 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const MenuItemText = styled.Text`
  color: #333;
  font-size: 14px;
`;

const routes = [
  { key: "1", title: "お知らせ" },
  { key: "2", title: "請求書" },
  { key: "3", title: "入退室" },
  { key: "4", title: "授業スケジュール" }
];

type TabProps = SceneRendererProps & {
  navigationState: NavigationState<{
    key: string;
    title: string;
  }>;
};

class App extends Component {
  state = {
    index: 0,
    routes: routes
  };

  scrollView: React.RefObject<ScrollView> = React.createRef();

  renderTabBar = (props: TabProps) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <StyledMenuContainer>
        <ScrollView
          ref={this.scrollView}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingRight: 15
          }}
        >
          {props.navigationState.routes.map((route, index) => {
            const fontSize = Animated.interpolate(props.position, {
              inputRange,
              outputRange: inputRange.map(i => (i === index ? 20 : 14))
            });

            return (
              <MenuItem
                key={route.key}
                style={styles.tabItem}
                onPress={() => {
                  this.setState({
                    index: index
                  });
                  if ((index + 1) % 4 === 0) {
                    this.scrollView.current.scrollToEnd();
                  }
                }}
              >
                <Animated.Text style={{ fontSize: fontSize }}>
                  {route.title}
                </Animated.Text>
              </MenuItem>
            );
          })}
        </ScrollView>
      </StyledMenuContainer>
    );
  };

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: theme.colors.main, flex: 1 }}>
        <View style={styles.container}>
          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              1: FirstRoute,
              2: SecondRoute,
              3: SecondRoute,
              4: SecondRoute
            })}
            renderTabBar={this.renderTabBar}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get("window").width }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  scene: {
    flex: 1
  },

  tabBar: {
    flexDirection: "row",
    paddingTop: 40
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16
  },
  date: {
    fontSize: 14,
    color: "#D0D0D5"
  }
});

export default App;
