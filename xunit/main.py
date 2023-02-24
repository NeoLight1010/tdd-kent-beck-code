from __future__ import annotations

class TestCase:
    def __init__(self, name: str) -> None:
        self.name = name

    def set_up(self) -> None:
        pass

    def tear_down(self) -> None:
        pass

    def run(self) -> TestResult:
        result = TestResult()
        result.test_started()

        self.set_up()

        method = getattr(self, self.name)
        method()

        self.tear_down()

        return result

class TestResult:
    def __init__(self) -> None:
        self.run_count = 0
        self.error_count = 0

    def test_started(self) -> None:
        self.run_count += 1

    def test_failed(self) -> None:
        self.error_count += 1

    def summary(self) -> str:
        return f"{self.run_count} run, {self.error_count} failed"

class WasRun(TestCase):
    def __init__(self, name: str) -> None:
        super().__init__(name)

    def set_up(self) -> None:
        self.was_run = None
        self.log = "set_up "

    def tear_down(self) -> None:
        self.log = self.log + "tear_down "

    def test_method(self) -> None:
        self.was_run = 1
        self.log = self.log + "test_method "

class TestCaseTest(TestCase):
    def test_template_method(self) -> None:
        test = WasRun("test_method")
        test.run()
        assert test.log == "set_up test_method tear_down "

    def test_result(self) -> None:
        test = WasRun("test_method")
        result = test.run()
        assert result.summary() == "1 run, 0 failed"

    def test_failed_result_formatting(self) -> None:
        result = TestResult()
        result.test_started()
        result.test_failed()

        assert result.summary() == "1 run, 1 failed"

TestCaseTest("test_template_method").run()
TestCaseTest("test_result").run()
TestCaseTest("test_failed_result_formatting").run()

# TODO
# - [x] Invoke test method
# - [x] Invoke set_up first
# - [x] Invoke tear_down afterward
# - [ ] Invoke tear_down even if the test method fails
# - [ ] Run multiple tests
# - [ ] Report collected results
# - [x] Log string in WasRun
# - [ ] Report failed tests
