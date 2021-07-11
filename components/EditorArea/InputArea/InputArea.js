import React, { useContext, useEffect} from 'react';
import { TextInput, View} from 'react-native';
import { useTheme } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';
import { saveFile } from '../../../modules/controlProjects';

export default function InputArea() {
    const { theme } = useTheme();
    const {
        isWindowWidthSmall,
        text,
        setText,
        isPreviewOpen,
        projectName,
        fileName
    } = useContext(ContextObject)

    function onChange(text) {
        setText(text)
        saveFile(projectName, fileName, text)
    }

    const styles = {
        container: {
            flex: 1,
            backgroundColor: theme.textView.backgroundColor,
            padding: 20,
            borderRadius: 20,
            marginRight: isPreviewOpen && !isWindowWidthSmall?5:0,
            marginTop: isWindowWidthSmall?5:0
        },
        text: {
            color: theme.textView.textColor,
            height: '100%'
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.text}
                multiline={true}
                scrollEnabled={true}
                textAlignVertical='top'
                onChangeText={text => onChange(text)}
                placeholder={!fileName?"メニューから新規作成":"Hello World!"}
                value={text}
                editable={!fileName ? false: true}
                placeholderTextColor={styles.text.color}
            />
        </View>
    )
}
