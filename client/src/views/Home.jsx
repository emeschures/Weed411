import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Weed.io'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Keeping track of it all.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
	<Link to="/login">
    <Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
	</Link>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive {...Responsive.onlyComputer}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }} vertical>
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Link to="/"><Menu.Item as='a' active>Home</Menu.Item></Link>
                {/* <Menu.Item as='a'></Menu.Item>
                <Menu.Item as='a'></Menu.Item> */}
                
                <Menu.Item position='right'>
                  <Link to="login"><Button as='a' inverted={!fixed}>Log in</Button></Link>
                  <Link to="signup"><Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>Sign Up</Button></Link>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive {...Responsive.onlyMobile}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
            <Menu.Item as='a' active>Home</Menu.Item>
            <Menu.Item as='a'>Log in</Menu.Item>
            <Menu.Item as='a'>Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handlePusherClick} style={{ minHeight: '100vh' }}>
            <Segment inverted textAlign='center' style={{ minHeight: 350, padding: '1em 0em' }} vertical>
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>Log in</Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>We're Only Human</Header>
            <p style={{ fontSize: '1.33em' }}>
              We tend to forget things, but with Weed.io, you can easily keep track of all your past cannabis habits.  From what strains or edibles you tried and liked, to how much you spent. 
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>We're Only Human</Header>
            <p style={{ fontSize: '1.33em' }}>
              Did we say that already?
			  After you sign up.  Create a list that will keep track of your smoking, eating and spending habits. 
            </p>
          </Grid.Column>
          {/* <Grid.Column floated='right' width={6}>
            <Image
              bordered
              rounded
              size='large'
              src='/assets/images/wireframe/white-image.png'
            />
          </Grid.Column> */}
        </Grid.Row>
        {/* <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge'>Check Them Out</Button>
          </Grid.Column>
        </Grid.Row> */}
      </Grid>
    </Segment>
    {/* <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>"What a Company"</Header>
            <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>"I shouldn't have gone with their competitor."</Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='/assets/images/avatar/large/nan.jpg' />
              <b>Nan</b> Chief Fun Officer Acme Toys
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment> */}
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>Placeholder</Header>
        <p style={{ fontSize: '1.33em' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat suscipit ut dolore iste quo repudiandae quam rerum labore laboriosam dicta esse quas deserunt, adipisci atque libero accusantium quos sequi eos!
        </p>
        {/* <Button as='a' size='large'>Read More</Button> */}
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          {/* <a href='#'>Case Studies</a> */}
        </Divider>
        <Header as='h3' style={{ fontSize: '2em' }}>Placeholder 2</Header>
        <p style={{ fontSize: '1.33em' }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque omnis quos mollitia molestias beatae, sequi laborum repellendus quis harum ipsam recusandae accusamus modi ullam veritatis cum. Laboriosam aperiam ipsa incidunt.
        </p>
        {/* <Button as='a' size='large'>I'm Still Quite Interested</Button> */}
      </Container>
    </Segment>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <Link to="/about"><List.Item as='a'>About Us</List.Item></Link>
                <Link to="/contact"><List.Item as='a'>Contact Us</List.Item></Link>
              </List>
            </Grid.Column>
            {/* <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>About Us</List.Item>
                <List.Item as='a'>Contact</List.Item>
                <List.Item as='a'>Sitemap</List.Item>
              </List>
            </Grid.Column> */}
            <Grid.Column width={7}>
              <Header as='h4' inverted>Weed.io</Header>
              <p>Go green.</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)
export default HomepageLayout

// import React from 'react'
// import { Header } from 'semantic-ui-react'

// const Home = (props) => {
// 	return (
// 		<div>
// 			<div className="ui huge header">
// 			<Header size="huge">High! Welcome!</Header>
// 			</div>
// 			<div className="ui medium header">
// 			<Header size="medium">Learn About Products & How to Consume</Header>
// 			</div>
// 			<div className="ui medium header">
// 			<Header size="medium">Information on the Plant</Header>
// 			</div>
// 			<div className="ui medium header">
// 			<Header size="medium">Laws & Regulations</Header>
// 			</div>
// 			<div className="ui medium header">
// 			<Header size="medium">Cannabis Dictionary</Header>
// 			</div>
// 		</div>
// 	)
// }

// export default Home