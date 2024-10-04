// src/app/page.js
'use client';

import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Textarea,
  Switch,
  Spinner,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from '@material-tailwind/react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [context, setContext] = useState([]);
  const [activeTab, setActiveTab] = useState('current');

  // Handle theme toggle
  const handleThemeChange = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Handle text analysis
  const analyzeText = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText, context }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An unexpected error occurred');
      }

      const newEntry = {
        input: inputText,
        output: data.response,
      };

      setConversation([...conversation, newEntry]);
      setContext([
        ...context,
        { role: 'user', content: inputText },
        { role: 'assistant', content: data.response },
      ]);
      setHistory([...history, newEntry]);
      setInputText('');
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle reset
  const handleReset = () => {
    setInputText('');
    setConversation([]);
    setContext([]);
    setError('');
  };

  // Render conversation
  const renderConversation = () => {
    return conversation.map((entry, index) => (
      <Card key={index} className="my-4">
        <CardBody>
          <Typography variant="h6" color="blue-gray">
            User:
          </Typography>
          <Typography>{entry.input}</Typography>
          <Typography variant="h6" color="blue-gray" className="mt-4">
            SCANUE:
          </Typography>
          <Typography>{entry.output}</Typography>
        </CardBody>
      </Card>
    ));
  };

  // Render history
  const renderHistory = () => {
    return history.map((entry, index) => (
      <Card key={index} className="my-4">
        <CardBody>
          <Typography variant="h6" color="blue-gray">
            Analysis {index + 1}
          </Typography>
          <Typography>
            <strong>Input:</strong> {entry.input}
          </Typography>
          <Typography>
            <strong>Output:</strong> {entry.output}
          </Typography>
        </CardBody>
      </Card>
    ));
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <main className="min-h-screen text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
        {/* Header */}
        <header className="p-4 bg-blue-500">
          <div className="container flex items-center justify-between mx-auto">
            <Typography variant="h4" color="white">
              SCANUE
            </Typography>
            <Switch
              id="theme-toggle"
              checked={isDark}
              onChange={handleThemeChange}
              icon={
                isDark ? (
                  <MoonIcon className="w-5 h-5 text-white" />
                ) : (
                  <SunIcon className="w-5 h-5 text-white" />
                )
              }
            />
          </div>
        </header>

        {/* Tabs */}
        <div className="container p-4 mx-auto">
          <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
            <TabsHeader>
              <Tab value="current">Current</Tab>
              <Tab value="history">History</Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="current">
                {/* Input Textarea */}
                <Textarea
                  label="Describe your issue..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  size="lg"
                />
                {error && <Typography color="red">{error}</Typography>}
                <div className="flex mt-4 space-x-4">
                  <Button onClick={analyzeText} disabled={loading}>
                    {loading ? <Spinner /> : 'Analyze'}
                  </Button>
                  <Button onClick={handleReset} color="red">
                    Reset
                  </Button>
                </div>
                {/* Conversation */}
                {renderConversation()}
              </TabPanel>
              <TabPanel value="history">{renderHistory()}</TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
