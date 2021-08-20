import React, { useState } from 'react';
import { View } from 'react-native';
import Timer from '../components/Timer';
import * as FileSystem from 'expo-file-system';

const DB_DIR = `${FileSystem.documentDirectory}meditations4.csv`;

function CSVToArray(strData, strDelimiter) {
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = strDelimiter || ',';

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
    // Delimiters.
    '(\\' +
      strDelimiter +
      '|\\r?\\n|\\r|^)' +
      // Quoted fields.
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      // Standard fields.
      '([^"\\' +
      strDelimiter +
      '\\r\\n]*))',
    'gi'
  );

  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;

  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while ((arrMatches = objPattern.exec(strData))) {
    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];

    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);
    }

    var strMatchedValue;

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"');
    } else {
      // We found a non-quoted value.
      strMatchedValue = arrMatches[3];
    }

    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }

  // Return the parsed data.
  return arrData;
}

const MeditationScreen = () => {
  const [finished, setFinished] = useState(false);

  const setMeditations = async (date, time) => {
    try {
      console.log('Setting meditations');

      const { exists } = await FileSystem.getInfoAsync(DB_DIR);

      if (!exists) {
        console.log('DB not previously existing. Creating...');

        await FileSystem.writeAsStringAsync(DB_DIR, `date,meditationTime,totalTime`);
      } else {
        console.log('DB previously existing. Writing...');
      }

      const res = await FileSystem.readAsStringAsync(DB_DIR);

      const dataArr = CSVToArray(res);

      let totalTime = 0;

      const oldMeditations = dataArr.slice(1);

      if (oldMeditations.length > 0) {
        totalTime = parseInt(oldMeditations[oldMeditations.length - 1][2]);
      }

      dataArr.push([date, time, time + totalTime]);

      const finalData = dataArr
        .map(function (d) {
          return d.join();
        })
        .join('\n');

      await FileSystem.writeAsStringAsync(DB_DIR, finalData);

      console.log('Meditation set', finalData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTimerFinish = totalTime => {
    setFinished(true);

    const date = new Date();

    const completeDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

    setMeditations(completeDate, totalTime);
  };

  return <View>{!finished && <Timer onFinish={handleTimerFinish} from={5} />}</View>;
};

export default MeditationScreen;
