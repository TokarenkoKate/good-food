import {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';

interface BottomModalProps {
  children: any;
  isModalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const BottomModal: React.FC<BottomModalProps> = ({
  children,
  isModalVisible,
  setModalVisible,
}) => (
  <Modal
    isVisible={isModalVisible}
    swipeDirection="down"
    onSwipeComplete={() => {
      setModalVisible(false);
    }}
    propagateSwipe={false}
    useNativeDriver
    style={styles.modal}>
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.dragBar} />
        {children}
      </View>
    </View>
  </Modal>
);

export default BottomModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  dragBar: {
    width: '30%',
    height: 6,
    marginBottom: 10,
    borderRadius: 3,
    backgroundColor: '#bec2c7',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '80%',
    alignItems: 'center',
    paddingTop: 15,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: '#ffffff',
  },
});
