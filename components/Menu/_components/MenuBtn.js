import React, { useContext, useState} from 'react';
import { Text, Pressable } from 'react-native';
import { Icon, useTheme } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';



export default function MenuBtn(props) {
    const { theme } = useTheme();
    const {
    } = useContext(ContextObject)

    const [isOnPress, setOnPress] = useState(false)

    const styles={
        wrap: {
            width: '100%',
            height: 46,
            marginTop: 10,
            backgroundColor: (isOnPress ? theme.menuBtn.onPress.BackgroundColor :theme.menuBtn.BackgroundColor),
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft:10,
            paddingRight: 10
        },
        icon:{
            color: (isOnPress ? theme.menuBtn.onPress.iconColor : theme.menuBtn.iconColor),
            marginRight: 10,
            fontSize: 28
        },
        btnText:{
            color: (isOnPress ? theme.menuBtn.onPress.TextColor : theme.menuBtn.TextColor),
            fontSize: 18
        }
    }
    function onPress() {
        props.onPress()
        { isOnPress ? setOnPress(false) : setOnPress(true) }
    }
    
    return (
        <Pressable style={styles.wrap} onPress={onPress}>
            <Icon
            name={props.iconName}
            iconStyle={styles.icon}
            />
            <Text style={styles.btnText}>{props.name}</Text>
        </Pressable>
    )
}