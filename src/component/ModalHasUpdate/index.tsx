import React, { useEffect, useState } from "react";
import { Modal, ModalProps, Linking } from "react-native";
import FontSize, { widthPercentageToDP } from "../../global/styles/responsive";
import { theme } from "../../global/styles/theme";
import { Button } from "../Button";
import { TextBold, TextSemiBold } from "../TextHeading";
import { Container, Content, Footer } from "./styles";
import UpdateSvg from "../../assets/images/update.svg";
import firestore from "@react-native-firebase/firestore";
import pkg from "../../../package.json";
import { WebView } from "react-native-webview";

type Props = ModalProps;

export function ModalHasUpdate({ ...rest }: Props) {
  const { secondary, transparent } = theme.colors;
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const versionCollection = async () => {
    firestore()
      .collection("versionApp")
      .doc("iMQ4p0IxGRTvI2PEapXM")
      .onSnapshot((snapshot) => {
        if (pkg.version == snapshot.data()?.version) {
          return setVisible(false);
        } else {
          setTitle(snapshot.data()?.title);
          setSubtitle(snapshot.data()?.subtitle);
          return setVisible(true);
        }
      });
  };

  useEffect(() => {
    versionCollection();
  }, []);

  return (
    <Modal transparent animationType="fade" visible={visible} {...rest}>
      <Container>
        <Content>
          <UpdateSvg
            width={widthPercentageToDP(10)}
            height={widthPercentageToDP(10)}
            style={{
              alignSelf: "center",
              marginBottom: widthPercentageToDP(3),
            }}
          />
          <TextSemiBold
            fontSize={FontSize(18)}
            color={"#424242"}
            textAlign="left"
          >
            {`${title}\n\n${subtitle}`}
          </TextSemiBold>

          <Footer>
            <Button
              background={secondary}
              style={{ width: "100%", marginBottom: widthPercentageToDP(5) }}
              onPress={() =>
                Linking.openURL("market://details?id=com.brapptutobr.app")
              }
            >
              <TextBold fontSize={FontSize(15)}>ATUALIZAR AGORA 😄</TextBold>
            </Button>

            <Button
              background={transparent}
              style={{ width: "100%" }}
              borderNone
              onPress={() => setVisible(false)}
            >
              <TextBold color="#424242" fontSize={FontSize(15)} outline>
                MAIS TARDE 😥
              </TextBold>
            </Button>
          </Footer>
        </Content>
      </Container>
    </Modal>
  );
}
