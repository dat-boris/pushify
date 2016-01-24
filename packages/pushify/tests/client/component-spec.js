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

  it("should have input form", function() {
    renderWithProps({});
    var content_element = TestUtils.findRenderedDOMComponentWithClass(component, "content");
    expect(content_element).toBeTruthy(true);

  });

});
