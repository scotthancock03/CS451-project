import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = '@cached_quote';
const API_KEY = 'luiOAgEtVizbueaFqSlmVlLMLa0HLxkO8qs05qzk';

export default function QuoteDisplay({ cardStyle, themeColor = '#007AFF' }) {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRandomQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.api-ninjas.com/v2/randomquotes', {
        method: 'GET',
        headers: {
          'X-Api-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data && data.length > 0) {
        const newQuote = data[0].quote;
        const newAuthor = data[0].author;

        setQuote(newQuote);
        setAuthor(newAuthor);

        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({ q: newQuote, a: newAuthor }));
      }
    } catch (error) {
      console.warn("Network request failed, attempting to read cache...", error);
      if (!quote) {
        await loadCachedQuote();
      }
    } finally {
      setLoading(false);
    }
  };

  const loadCachedQuote = async () => {
    try {
      const savedData = await AsyncStorage.getItem(CACHE_KEY);
      if (savedData !== null) {
        const parsedData = JSON.parse(savedData);
        setQuote(parsedData.q);
        setAuthor(parsedData.a);
      } else {
        setQuote("The only true wisdom is in knowing you know nothing.");
        setAuthor("Socrates");
      }
    } catch (error) {
      console.error("Failed to read cache:", error);
    }
  };

  useEffect(() => {
    const initializeQuote = async () => {
      await loadCachedQuote();
      await fetchRandomQuote();
    };

    initializeQuote();
  }, []);

  return (
    <View style={[styles.quoteCard, cardStyle]}>
      {loading && !quote ? (
        <ActivityIndicator size="large" color={themeColor} />
      ) : (
        <>
          <Text style={styles.quoteText}>“{quote}”</Text>
          <Text style={styles.authorText}>— {author}</Text>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: themeColor, opacity: loading ? 0.6 : 1 }]} 
            onPress={fetchRandomQuote}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Loading..." : "New Quote"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  quoteCard: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 24,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#444',
    lineHeight: 26,
    marginBottom: 10,
  },
  authorText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    alignSelf: 'flex-end',
    color: '#777',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});