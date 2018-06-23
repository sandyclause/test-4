import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart';
import InfoList from './components/InfoList';

class App extends Component {
  constructor(){
    super();

    const colors = [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
    ]

    this.state = {
      creditDebitChart: {
        labels: ['Credits', 'Debits'],
        datasets: [
          {
            data: [],
            backgroundColor: colors
          }
        ]
      },
      maleFemaleChart: {
        labels: ['Male', 'Female'],
        datasets: [
          {
            data: [],
            backgroundColor: colors
          }
        ]
      },
      maleFemaleDebitChart: {
        labels: ['Male Debits', 'Female Debits'],
        datasets: [
          {
            data: [],
            backgroundColor: colors
          }
        ]
      },
      maleFemaleCreditChart: {
        labels: ['Male Credits', 'Female Credits'],
        datasets: [
          {
            data: [],
            backgroundColor: colors
          }
        ]
      },
      personalCreditDebit: {
        labels: ['Credits', 'Debits'],
        datasets: [
          {
            data: [],
            backgroundColor: colors
          }
        ]
      },
      chartDisplay: false,
      data: {},
      infoList: [],
      fileLoadedName: '',
      searchInput: '',
      searchParam: 'first_name',
    }
  }

  //uses papaparse to convert CSV file
  parseFile = (e) => {
    e.preventDefault();
    const filePath = e.currentTarget[0].files[0];
    const Papa = require('papaparse');
    Papa.parse(filePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.updateData
    });
  }

  //goes through the data and setState
  updateData = (result) => {
    this.creditVsDebit(result.data);
    this.maleVSFemale(result.data);

    this.setState({
      data: result.data
    })
  }


  //grabs all the info related to credits and debits
  creditVsDebit = (data) => {
    let totalCreditsArray = [];
    let totalDebitsArray = [];
    let totalDataArray = [];

    //goes through and grabs all the credit data
    for (let i = 0; i < data.length; i++) {
      if (data[i].credit !== undefined){
        //prase string to float and regex to get rid of random stuff
        const parsedNumber = parseFloat(data[i].credit.replace(/[^0-9.-]/g, ""));
        //checks if it's an actual number before pushing to an array
        if (!isNaN(parsedNumber)){
          totalCreditsArray.push(parsedNumber);
        }
      }
    }
    //gets rid of all the empty values in the array
    totalCreditsArray = totalCreditsArray.filter(Boolean);
    const totalCredits = totalCreditsArray.reduce((a, b) => a + b, 0);
    //sets to 2 decimal points
    totalDataArray.push(totalCredits.toFixed(2));


    //goes through and grabs all the debit data
    for (let i = 0; i < data.length; i++) {
      if (data[i].debit !== undefined){
        const parsedNumber = parseFloat(data[i].debit.replace(/[^0-9.-]/g, ""));
        if (!isNaN(parsedNumber)){
          totalDebitsArray.push(parsedNumber);
        }
      }
    }
    totalDebitsArray = totalDebitsArray.filter(Boolean);
    const totalDebits = totalDebitsArray.reduce((a, b) => a + b, 0);
    totalDataArray.push(totalDebits.toFixed(2));


    //clones state
    const chartDataClone = Object.assign({}, this.state.creditDebitChart);
    chartDataClone.datasets[0].data = totalDataArray;
    
    this.setState({
      creditDebitChart: chartDataClone,
      chartDisplay: true
    }, () => {
      this.smoothScroll();
    });
  }

  //grabs all the data related to the gender and their respective credits/debits
  maleVSFemale = (data) => {
    let maleNum = 0;
    let femaleNum = 0;
    const maleFemaleArray = [];

    let maleCreditArray = [];
    let maleDebitArray = [];
    let femaleCreditArray = [];
    let femaleDebitArray = [];
    const maleFemaleDebitArray = [];
    const maleFemaleCreditArray = [];
    
    //maps through the object and performs the check to filter the data
    data.map((person => {
      //passes 'Male' or 'm'
      if (person.gender === 'Male' && person.gender !== '' || person.gender === 'm'){
        maleNum++;
        if (person.credit !== ''){
          const parsedNumber = parseFloat(person.credit.replace(/[^0-9.-]/g, ""));
          if (!isNaN(parsedNumber)) {
            maleCreditArray.push(parsedNumber);
          }
        }
        if (person.debit !== ''){
          const parsedNumber = parseFloat(person.debit.replace(/[^0-9.-]/g, ""));
          if (!isNaN(parsedNumber)){
            maleDebitArray.push(parsedNumber);
          }
        }
      } else if (person.gender === 'Female' && person.gender !== '' || person.gender === 'f'){
        femaleNum++;
        if (person.credit !== ''){
          const parsedNumber = parseFloat(person.credit.replace(/[^0-9.-]/g, ""));
          if (!isNaN(parsedNumber)){
            femaleCreditArray.push(parsedNumber);
          }
        }
        if (person.debit !== ''){
          const parsedNumber = parseFloat(person.debit.replace(/[^0-9.-]/g, ""));
          if (!isNaN(parsedNumber)){
            femaleDebitArray.push(parsedNumber);
          }
        }
      }
    }));

    //adds to array
    maleFemaleArray.push(maleNum);
    maleFemaleArray.push(femaleNum);

    //filters empty values
    maleCreditArray.filter(Boolean);
    maleDebitArray.filter(Boolean);
    femaleCreditArray.filter(Boolean);
    femaleDebitArray.filter(Boolean);

    //sums all the values
    const totalMaleCredits = maleCreditArray.reduce((a, b) => a + b, 0);
    const totalMaleDebits = maleDebitArray.reduce((a, b) => a + b, 0);
    const totalFemaleCredits = femaleCreditArray.reduce((a, b) => a + b, 0);
    const totalFemaleDebits = femaleDebitArray.reduce((a, b) => a + b, 0);

    //pushes to their respective arrays
    maleFemaleDebitArray.push(totalMaleDebits.toFixed(2));
    maleFemaleDebitArray.push(totalFemaleDebits.toFixed(2));

    maleFemaleCreditArray.push(totalMaleCredits.toFixed(2));
    maleFemaleCreditArray.push(totalFemaleCredits.toFixed(2));

    //clones states
    const maleFemaleChartClone = Object.assign({}, this.state.maleFemaleChart);
    maleFemaleChartClone.datasets[0].data = maleFemaleArray;

    const maleFemaleDebitChartClone = Object.assign({}, this.state.maleFemaleDebitChart);
    maleFemaleDebitChartClone.datasets[0].data = maleFemaleDebitArray;

    const maleFemaleCreditChartClone = Object.assign({}, this.state.maleFemaleCreditChart);
    maleFemaleCreditChartClone.datasets[0].data = maleFemaleCreditArray;

    this.setState({
      maleFemaleChart: maleFemaleChartClone,
      maleFemaleDebitChart: maleFemaleDebitChartClone,
      maleFemaleCreditChart: maleFemaleCreditChartClone
    });
  }

  smoothScroll() {
    // Scroll to specific values
    // scrollTo is the same
    window.scroll({
      top: 2500,
      left: 0,
      behavior: 'smooth'
    });

    // Scroll certain amounts from current position
    window.scrollBy({
      top: 100, // could be negative value
      left: 0,
      behavior: 'smooth'
    });

    // Scroll to a certain element
    document
      .querySelector("#searchTitle")
      .scrollIntoView({
        behavior: "smooth"
      });
  }


  fileLoaded = (file) => {
    const fileName = file.currentTarget.files[0].name;
    this.setState({
      fileLoadedName: fileName
    })
  }

  searchInput = (e) => {
    const searchInput = e.currentTarget.value;
    this.setState({
      searchInput
    })
  }

  searchParam = (e) => {
    const searchParam = e.currentTarget.value;
    console.log(searchParam);
    this.setState({
      searchParam
    })
  }

  searchFile = (e) => {
    e.preventDefault();
    const searchedIndexArray = [];
    const allData = this.state.data;
    let searchedInfo;
    const infoListArray = [];
    const personalCreditDebitArray = [];

    //maps over all the data and compares with user search query
    allData.map((data, index) => {
      if(data[this.state.searchParam].toUpperCase() === this.state.searchInput.toUpperCase()){
        searchedIndexArray.push(index);
      }
    })

    //finds the key and passes all info assocated with that key to InfoList comp
    searchedInfo = allData[searchedIndexArray[0]]
    for (let key in searchedInfo){
      console.log(key + ' ' + searchedInfo[key])
      infoListArray.push(
        <InfoList 
          key={key}
          label={key}
          info={searchedInfo[key]} 
        />
      )
    };



    for (let key in searchedInfo){
      if (key === 'debit'){

        let parsedValue = parseFloat(searchedInfo[key].replace(/[^0-9.-]/g, ""));

        if (!isNaN(parsedValue)){
          personalCreditDebitArray.push(parsedValue);
        } else if (isNaN(parsedValue)){
          parsedValue = '';
          personalCreditDebitArray.push(parsedValue);
        }
      }
      if (key === 'credit') {
        let parsedValue = parseFloat(searchedInfo[key].replace(/[^0-9.-]/g, ""));

        if (!isNaN(parsedValue)){
          personalCreditDebitArray.push(parsedValue);
        } else if (isNaN(parsedValue)){
          parsedValue = '';
          personalCreditDebitArray.push(parsedValue);

        }
      }
    }

    //clones state
    const chartDataClone = Object.assign({}, this.state.personalCreditDebit);
    chartDataClone.datasets[0].data = personalCreditDebitArray;

    this.setState({
      infoList: infoListArray,
      personalCreditDebit: chartDataClone
    });
  }

  render() {
    const renderChart = this.state.chartDisplay ? 
      (
        <div id="chart">
          <Chart
            creditDebitData={this.state.creditDebitChart}
            maleFemaleData={this.state.maleFemaleChart}
            maleFemaleDebitData={this.state.maleFemaleDebitChart}
            maleFemaleCreditData={this.state.maleFemaleCreditChart}
            personalCreditDebit={this.state.personalCreditDebit}
          />
        </div>
      ) : null;
    const renderBackButton = document.documentElement.clientHeight < document.documentElement.scrollHeight ? <a href="#home" className="backToTop">
          Back to Top
        </a> : null;

    const renderSearch = this.state.chartDisplay ?
      (
        <React.Fragment>
        <p className="searchTitle" id='searchTitle'>Search by individuals</p>
        <div className="search" id="search">
          <form className="searchForm" onSubmit={this.searchFile}>
            <input type="text" id="searchInput" onChange={this.searchInput} />
            <select id='searchParam' onChange={this.searchParam}>
              <option value="first_name">firstname</option>
              <option value="last_name">lastname</option>
              <option value="email">email</option>
            </select>
            <button className="button">Search</button>
          </form>
        </div>
        <ul>
          {this.state.infoList.map(info => {
            return info
          })}
        </ul>
        

        </React.Fragment>
      ) : null;


    return <div className="App">
          <section className="intro" id="home">
            <form className="formGroup" onSubmit={this.parseFile}>
              <p>Choose the CSV file to upload</p>
              <label htmlFor="files" className='uploadLabel'>Upload
                <input type="file" id="files" className="formControl" accept=".csv" required onChange={this.fileLoaded}/>
              </label>
              <p id='fileName'>{this.state.fileLoadedName}</p>
              <button type="submit" id="submitFile" className="button">
                Submit
              </button>
            </form>
          </section>
          {renderSearch}

        <div className="wrapper">
          {renderChart}
          {renderBackButton}
        </div>
      </div>; 
  }
}

export default App;
