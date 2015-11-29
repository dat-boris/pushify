TestUtils = React.addons.TestUtils;
Simulate = TestUtils.Simulate;

renderComponent = function (comp, props) {
  return TestUtils.renderIntoDocument(
    React.createElement(comp, props)
  );
};

describe("CountHomeLayout Component", function() {
  var renderWithProps, component, el;

  beforeEach(function() {
    renderWithProps = function(props) {
      component = renderComponent(HomeLayout, props);
      el = React.findDOMNode(component);
    };
  });

  it("should have default count", function() {
    renderWithProps({});
    expect(component.state.count).toBe(0);
  });

});
