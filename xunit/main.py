class TestCase:
    def __init__(self, name: str) -> None:
        self.name = name

    def run(self) -> None:
        method = getattr(self, self.name)
        method()

class WasRun(TestCase):
    def __init__(self, name: str) -> None:
        self.was_run = None

        super().__init__(name)

    def test_method(self) -> None:
        self.was_run = 1

class TestCaseTest(TestCase):
    def test_running(self) -> None:
        test = WasRun("test_method")

        assert not test.was_run
        test.run()
        assert test.was_run

TestCaseTest("test_running").run()
