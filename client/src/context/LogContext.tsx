import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { UserAuth } from './AuthContext';

interface LogsDict {
  [key: string]: Log
};

interface LogList {
  logs: LogsDict,
  addLog: (log: Log) => void,
  editLog: (log: Log) => void,
  removeLog: (productId: number) => void,
  isLoadingLogs: boolean
};

const LogContext = createContext<LogList>({ logs: {}, addLog: () => {}, editLog: () => {}, removeLog: () => {}, isLoadingLogs: true});

export const LogContextProvider = ({ children }: { children: ReactNode }) => {
  const auth = UserAuth();
  const [logs, setLogs] = useState<LogsDict>({});
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  
  const fetchLogs = () => {
    if (!auth?.user.uuid) return;
    setIsLoadingLogs(true);

    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': auth.csrftoken ?? ""
    };

    axios.get(`/api/users/${auth.user.uuid}/logs/`, {
      headers: headers
    }).then((response) => {
      console.log('✅ LOGS: ', response);
      let workingLogs: LogsDict = {};
      response.data.forEach((log: Log) => {
        workingLogs[log.product.toString()] = log;
      });
      setLogs(workingLogs);
      setIsLoadingLogs(false);
    })
    .catch((err) => console.log('😈 Log fetch error: ', err));
  };

  useEffect(() => {
    fetchLogs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user]);

  const addLog = (log: Log) => {
    setLogs({
      ...logs,
      [log.product]: log
    });
  };

  const editLog = (log: Log) => {
    let workingLogs: LogsDict = logs;
    workingLogs[log.product] = log;
    setLogs(workingLogs);
  };

  const removeLog = (productId: number) => {
    let workingLogs: LogsDict = logs;
    delete workingLogs[productId];
    setLogs(workingLogs);
  };

  return <LogContext.Provider value={{ logs, addLog, editLog, removeLog, isLoadingLogs }}>
    { children }
  </LogContext.Provider>
};

export const UserLogs = () => {
  return useContext(LogContext);
};