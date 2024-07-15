import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { auth } from '../services/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, setPersistence, onAuthStateChanged, browserSessionPersistence, signOut} from 'firebase/auth';
import YesterdayData from '../components/YesterdayData';