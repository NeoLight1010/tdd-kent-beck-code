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
        self.was_run = None

        super().__init__(name)

    def set_up(self) -> None:
        self.was_set_up = 1

    def test_method(self) -> None:
        self.was_run = 1

class TestCaseTest(TestCase):
    def test_running(self) -> None:
        test = WasRun("test_method")

        assert not test.was_run
        test.run()
        assert test.was_run

    def test_set_up(self) -> None:
        test  = WasRun("test_method")
        test.run()
        assert test.was_set_up

TestCaseTest("test_running").run()
TestCaseTest("test_set_up").run()

# TODO
# - [x] Invoke test method
# - [ ] Invoke set_up first
# - [ ] Invoke tear_down afterward
# - [ ] Invoke tear_down even if the test method fails
# - [ ] Run multiple tests
# - [ ] Report collected results