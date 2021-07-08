import React, { useContext, useEffect, useState} from 'react';
import { View, Text, Pressable} from 'react-native';
import { Icon, useTheme} from 'react-native-elements';
import { ContextObject } from '../../../modules/context';
import {readProjects} from '../../../modules/controlProjects';
import {SetDataNameModal} from '../../_components/Modal';
import MenuBtn from '../_components/MenuBtn';
import MenuBtnChild from '../_components/MenuBtnChild';
import MenuTitle from '../_components/MenuTitle';

export default function Folder(params) {
    const { theme } = useTheme();
    const {
        setIsMenuOpen
    } = useContext(ContextObject)

    const [isTypeSelectMenuOpen, setTypeSelectMenuOpen]=useState(false)
    
    const styles = {
        view:{
            position: 'relative',
            zIndex:10,
            width: '100%',
            height: '100%'
        },
        plusIconContainer: {
            position: 'absolute',
            top: -10,
            left: 0,
            zIndex:100,
        },
        plusIcon:{
            fontSize: 40
        }
    }

    function onPressPlusIcon() {
        { isTypeSelectMenuOpen ? setTypeSelectMenuOpen(false):setTypeSelectMenuOpen(true)}
    }

    return (
        <View style={styles.view}>
            <Icon
                name='add-circle'
                color={theme.PlusBtn.iconColor}
                containerStyle={styles.plusIconContainer}
                iconStyle={styles.plusIcon}
                onPress={onPressPlusIcon}
            />
            {isTypeSelectMenuOpen ? <TypeSelectMenu onPress={() => { setTypeSelectMenuOpen(false)}}/> : <View/>}
            <MenuTitle>プロジェクト</MenuTitle>
            <Project
                project={{
                    projectName:'test',
                    fileList:['test','test2']
                }}
            />
            
        </View>
    )
}

function TypeSelectMenu(props) {
    const { theme } = useTheme();
    const {
        isSetDataNameModalOpen,
        setSetDataNameModalOpen,
        whichSetDataNameModalOpen,
        setWhichDataNameModalOpen,
        projectName,
        setProjectName,
        fileName,
        setFileName
    } = useContext(ContextObject)

    const styles={
        view: {
            flex: 1,
            flexDirection: 'column',
            position: 'absolute',
            top: 30,
            left: 0,
            zIndex: 100,
            // backgroundColor: theme.typeSelectMenu.BackgroundColor,
            width: '80%',
            borderRadius: 20,
        },
    }

    function onPressAddProject() {
        props.onPress()
        setSetDataNameModalOpen(true)
        setWhichDataNameModalOpen('addProject')
    }
    function onPressAddFile() {
        props.onPress()
        setSetDataNameModalOpen(true)
        setWhichDataNameModalOpen('addFile')
    }

    return(
        <View style={styles.view}>
            <TypeSelectMenuBtn
                iconName='create-new-folder'
                text='プロジェクト'
                addType='addProject'
                backgroundColor='pink'
                onPress={onPressAddProject}
            />
            <TypeSelectMenuBtn
                iconName='note-add'
                text='ファイル'
                addType='addFile'
                backgroundColor='red'
                onPress={onPressAddFile}
            />

        </View>
    )
}

function TypeSelectMenuBtn(props) {
    const { theme } = useTheme();

    const [isOnPress, setOnPress] = useState(false)

    console.log(isOnPress);
    const styles = {
        view: {
            // backgroundColor: props.backgroundColor,
            backgroundColor: isOnPress ? theme.typeSelectMenu.BackgroundColor : theme.typeSelectMenu.onPress.BackgroundColor ,
            height: '50%',
            flexDirection: 'row',
            alignItems: 'center',
            borderTopLeftRadius: props.addType == 'addProject'? 20 : 0,
            borderTopEndRadius: props.addType == 'addProject' ? 20 : 0,
            borderTopRightRadius: props.addType == 'addProject' ? 20 : 0,
            borderTopStartRadius: props.addType == 'addProject' ? 20 : 0,
            borderBottomLeftRadius: props.addType == 'addProject' ? 0 : 20,
            borderBottomEndRadius: props.addType == 'addProject' ? 0 : 20,
            borderBottomRightRadius: props.addType == 'addProject' ? 0 : 20,
            borderBottomStartRadius: props.addType == 'addProject' ? 0 : 20,
            padding: 20,
        },
        icon: {
            color: isOnPress? theme.typeSelectMenu.iconColor : theme.typeSelectMenu.onPress.iconColor,
            marginRight: 10,
            fontSize: 30,
        },
        text: {
            color: isOnPress? theme.typeSelectMenu.TextColor : theme.typeSelectMenu.onPress.TextColor,
            fontSize: 20,
        }
    }

    function onPress() {
        props.onPress()
        { isOnPress ? setOnPress(false) : setOnPress(true) }
        console.log('onpress');
    }

    return (
            <Pressable style={styles.view} onPress={onPress}>
                <Icon
                name={props.iconName}
                iconStyle={styles.icon}
                />
            <Text style={styles.text}>{props.text}</Text>
            
            </Pressable>
    )
    
}

function Project(props) {
    const { theme } = useTheme();
    const [isOnonPressMenuBtn, setOnonPressMenuBtn] = useState(false)
    const projects = props.project
    const projectName = projects.projectName
    const fileList = projects.fileList

    const styles={
        nodata:{
            color: '#FFFFFF',
            marginTop: 30,
        },
        
    }

    function onPressMenuBtn(params) {
        { isOnonPressMenuBtn ? setOnonPressMenuBtn(false) : setOnonPressMenuBtn(true)}
    }


    return(
        <View>
            
            {!projectName ? <Text style={styles.nodata}>＋ボタンから新規作成</Text>:
                <MenuBtn
                    name={projectName}
                    iconName={isOnonPressMenuBtn ?'folder-open':'folder'}
                    onPress={onPressMenuBtn}
                />
            }
            {isOnonPressMenuBtn?
                (
                    !fileList ? <Text style={styles.nodata}>＋ボタンから新規作成</Text> :
                        (fileList.map(e=>{
                            return(
                                <MenuBtnChild
                                    name={e}
                                    iconName='text-snippet'
                                />
                            )
                        }))
                    
                ):
            <View/>}

        </View>
    )
}