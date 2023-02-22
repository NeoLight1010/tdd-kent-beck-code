class TestCase:
    def __init__(self, name: str) -> None:
        self.name = name

    def set_up(self) -> None:
        pass

    def run(self) -> None:
        self.set_up()
        method = getattr(self, self.name)
        method()

class WasRun(TestCase):
    def __init__(self, name: str) -> None:
        super().__init__(name)

    def set_up(self) -> None:
        self.was_run = None
        self.log = "set_up "

    def test_method(self) -> None:
        self.was_run = 1
        self.log = self.log + "test_method "

class TestCaseTest(TestCase):
    def set_up(self) -> None:
        self.test = WasRun("test_method")

    def test_template_method(self) -> None:
        self.test.run()
        assert self.test.log == "set_up test_method "

TestCaseTest("test_template_method").run()

# TODO
# - [x] Invoke test method
# - [x] Invoke set_up first
# - [ ] Invoke tear_down afterward
# - [ ] Invoke tear_down even if the test method fails
# - [ ] Run multiple tests
# - [ ] Report collected results
# - [ ] Log string in WasRun
