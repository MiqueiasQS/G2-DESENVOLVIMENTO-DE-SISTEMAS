import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import QuizScreen from "../pages/QuestionScreen"
import Results from "../pages/ResultScreen"

const AuthStack = createNativeStackNavigator();

function AppRoutes() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen
                name="Questions"
                component={QuizScreen}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen
                name="Results"
                component={Results}
                options={{
                    headerShown: false,
                }}
            />
        </AuthStack.Navigator>
    )
}

export default AppRoutes;