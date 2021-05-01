import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';


const API_KEY = "wnYy77YeQI55zB5u5NQ5OQBVZMBxzn9QFhK1PbeI";

function App() {

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },

    button: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },

    textArea: {
      width: '15ch',
    },

    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      '& .MuiTextField-root': {
        marginTop: theme.spacing(2),
      },
    },
    gridList: {
      width: 500,
      height: 450,
    },

    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: 'url(https://i.ytimg.com/vi/wHGIlstqXMA/maxresdefault.jpg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
    text: {
      textAlign: 'left',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
    },
  }));

  const theme = createMuiTheme({
    status: {
      primary: blue[500],
      secondary: red[500],
    },
    palette: {
      primary: {
        main: '#0B3D91',
      },
      secondary: {
        main: '#FC3D21',
      },
  },
  })

  const classes = useStyles();
  const [rover, setRover] = React.useState('');
  const [camera, setCamera] = React.useState('');
  const [sol, setSol] = React.useState('');
  const [data, setData] = React.useState([]);
  const [showButton, setShowButton] = React.useState(false);
  const [amount, setAmount] = React.useState(12);
  const [lenght, setLength] = React.useState(0);

  const handleRoverChange = (event) => {
    setRover(event.target.value);
  };

  const handleCameraChange = (event) => {
    setCamera(event.target.value);
  };

  const handleSolChange = (event) => {
    setSol(event.target.value);
  };

  console.log(amount);

  const showMore = () => {
    if(amount < data.length){
      if(amount + 12 < data.length){
        setAmount(state => state + 12);
      } else {
        setAmount(data.length);
      }
    }
  }

  const showLess = () => {
    if(amount > 12){
      setAmount(state => state - 12);
    }
  }

  const sendRequest = () => {
    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${API_KEY}`;
    if (camera === "all") {
      url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${API_KEY}`;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {setData(data.photos);});
  }

  console.log(typeof(data));
  console.log(data.length);
  console.log(typeof(data.length));
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Container>
        <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: "https://i.ytimg.com/vi/wHGIlstqXMA/maxresdefault.jpg" }}>
          <div className={classes.overlay} />
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainFeaturedPostContent}>
                <Typography className={classes.text} component="h1" variant="h3" color="inherit" gutterBottom>
                  NASA
            </Typography>
                <Typography className={classes.text} variant="h5" color="inherit" paragraph >
                  Welcome to Oles Melnik website. Here you can find some photos that was taken on Mars by rovers. Just select some options and check your photo!
            </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
        <Grid>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Rover</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={rover}
              onChange={handleRoverChange}
            >
              <MenuItem value="curiosity">Curiosity</MenuItem>
              <MenuItem value="opportunity">Opportunity</MenuItem>
              <MenuItem value="spirit">Spirit </MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Camera</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={camera}
              onChange={handleCameraChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="fhaz">FHAZ</MenuItem>
              <MenuItem value="rmaz">RHAZ</MenuItem>
              <MenuItem value="mast">MAST</MenuItem>
              <MenuItem value="chemcam">CHEMCAM</MenuItem>
              <MenuItem value="mahli">MAHLI</MenuItem>
              <MenuItem value="mardi">MARDI</MenuItem>
              <MenuItem value="navcam">NAVCAM</MenuItem>
              <MenuItem value="pancam">PANCAM</MenuItem>
              <MenuItem value="minites">MINITES </MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField className={classes.textArea}
              id="standard-textarea"
              label="Sol"
              placeholder="1000"
              multiline
              onChange={handleSolChange}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button variant="contained" color="primary" className={classes.button} onClick={sendRequest}>
              Submit
      </Button>
          </FormControl>
        </Grid>

        <Grid container spacing={2}>
          {data.slice(0, amount).map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={3} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={item.img_src}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        {!!data.length && (<div><Button variant="contained" color="secondary" className={classes.button} onClick={showMore}>
          Show More
      </Button><Button variant="contained" color="primary" onClick={showLess} className={classes.button}>Show less</Button></div>)}
      </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
