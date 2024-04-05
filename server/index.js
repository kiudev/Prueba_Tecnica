const express = require("express");

const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require("firebase-admin/firestore")

const app = initializeApp();
const db = getFirestore();

